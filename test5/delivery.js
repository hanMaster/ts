"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delivery = void 0;
class Delivery {
    constructor() {
        this.date = new Date();
        this.destination = '';
    }
    static create() {
        return new Delivery();
    }
    at(date) {
        this.date = new Date(date);
        return this;
    }
    toHome(address) {
        this.destination = address;
        return this;
    }
    toDropPoint(dropId) {
        this.destination = dropId;
        return this;
    }
    isSet() {
        const validDate = this.date.toString() !== 'Invalid Date';
        return validDate && !!this.destination;
    }
}
exports.Delivery = Delivery;
