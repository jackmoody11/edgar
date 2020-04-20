import {IClient} from "./client.interface"
import {delay} from "../utils"
import axios, { AxiosResponse } from "axios"


export class NetworkClient implements IClient {

    // class variables
    _base: string = "http://www.sec.gov/";

    // attributes
    /**
     * @param retryCount: Number of times to retry if request is not successful
     * @param pause: Number of seconds to pause in between each request
     * @param numFilings: Maximum number of filings to retrieve. If numFilings is
     *      greater than the number of filings available, the client will only
     *      return the number available.
     */
    retryCount: number;
    pause: number;
    numFilings: number;

    constructor(retryCount=3, pause=0.5, numFilings=10) {
        this.retryCount = retryCount;
        this.pause = pause;
        this.numFilings = numFilings;
    }

    getResponse(path: string, params: any): any {
        let preparedUrl = this._prepareQuery(path);
        let response = null;
        [...Array(this.retryCount)].map((_, i) => {
            response = axios.get(preparedUrl)
            .then(
                async (response) => {
                    if (response.status == 200) {
                        // TODO: Break out of this function if response is successful
                        // validate that response is good (no SEC EDGAR errors)
                        this._validateResponse(response);
                    } else {
                        // if 200 not returned, then sleep
                        delay(this.pause * 1000);
                    }
                }
            )
        });
        return 0;
    }

    _prepareQuery(path: string): string {
        return this._base + path;
    }


    private _validateResponse(response: AxiosResponse): void {
        let errorMessages = ["The value you submitted is not valid",
                             "No matching Ticker Symbol.",
                             "No matching CIK.",
                             "No matching companies."];

        if (response == null) {
            throw new EDGARQueryError("No response.");
        }

        if (400 <= response.status && response.status < 500) {
            switch (response.status) {
                case 400: {
                    throw new EDGARQueryError(`The query could not be completed.
                                               The page does not exist.`);
                }
                default: {
                    throw new EDGARQueryError(`The query could not be completed.
                                               There was a client-side error with
                                               your request.`);
                }
            }
        } else if (500 <= response.status && response.status < 600) {
            throw new EDGARQueryError(`The query could not be completed.
                                       There was a server-side error with
                                       your request.`);
        } else if (errorMessages.some((errorMessage) => response.data.includes(errorMessage))) {
            throw new EDGARQueryError("A known error message was found. Make sure company name or ticker is correct.")
        }
    }
}