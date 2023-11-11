export class Product {
    readonly id: number;
    name: string;
    price: number;
    count: number = 1;

    constructor(id: number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}