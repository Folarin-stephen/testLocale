

class HttpException extends Error {
    // public status: number;
    // public message: string;

    constructor(public status: number, public message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

export default HttpException;