import {HttpException} from "@nestjs/common";

export class InvalidIDException extends HttpException{
    constructor() {
        super("invalid id", 404);
    }
}