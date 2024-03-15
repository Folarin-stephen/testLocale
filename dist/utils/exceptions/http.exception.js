"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    // public status: number;
    // public message: string;
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
        this.status = status;
        this.message = message;
    }
}
exports.default = HttpException;
