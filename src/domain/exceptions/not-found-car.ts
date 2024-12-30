import {  NotFoundException } from "@nestjs/common";




export class NotFoundCarException extends NotFoundException {
    constructor() {
        super('Car Not Found');

    }

}