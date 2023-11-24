export class Delivery {
    private date: Date = new Date();
    private destination: string | number = '';

    static create() {
        return new Delivery();
    }

    at(date: Date | string) {
        this.date = new Date(date);
        return this;
    }

    toHome(address: string) {
        this.destination = address;
        return this;
    }

    toDropPoint(dropId: number) {
        this.destination = dropId;
        return this;
    }

    isSet(): boolean {
        const validDate = this.date.toString() !== 'Invalid Date';
        return validDate && !!this.destination;
    }
}
