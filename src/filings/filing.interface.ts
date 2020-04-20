import {IClient} from "../client/client.interface"
import {FilingType} from "./filingTypes"
import { ICIK } from "./cik.interface"

export interface IFiling {
    client: IClient;
    filingType: FilingType;
    ciks: ICIK;
}