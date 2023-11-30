export default class Response {
    public status: boolean;
    public data: any;
    public messages: string;
    public exception: string;

    constructor(status: boolean, data: any, mess: string, exception: string) {
        this.status = status;
        this.data = data;
        this.messages = mess;
        this.exception = exception;
    }

}