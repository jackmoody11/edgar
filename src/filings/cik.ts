import {ICIK} from "./cik.interface"

export class CIK implements ICIK {
    ciks: string[];

    constructor(ciks: string[]) {
        this.ciks = ciks;
    }
}