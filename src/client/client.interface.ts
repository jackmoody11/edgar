export interface IClient {
    getResponse(path: string, params: any): any;
}