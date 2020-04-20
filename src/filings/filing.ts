
import { IFiling } from "./filing.interface";
import {IClient} from "../client/client.interface"
import { ICIK } from "./cik.interface";
import { FilingType } from "./filingTypes";

class Filing implements IFiling {
    client: IClient;
    filingType: FilingType;
    ciks: ICIK;

    constructor(client: IClient, filingType: FilingType, ciks: ICIK) {
        this.client = client;
        this.filingType = filingType;
        this.ciks = ciks;
    }



}