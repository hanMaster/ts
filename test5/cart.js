"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delivery_1 = require("./delivery");
const product_1 = require("./product");
class Cart {
    constructor() {
        this.products = [];
        this.delivery = new delivery_1.Delivery();
    }
    setDelivery(destination, date) {
        if (typeof destination === 'string') {
            this.delivery = delivery_1.Delivery.create().toHome(destination).at(date !== null && date !== void 0 ? date : new Date());
        }
        else {
            this.delivery = delivery_1.Delivery.create().toDropPoint(destination);
        }
    }
    addProduct(id, name, price) {
        const productInCart = this.getProductById(id);
        if (productInCart) {
            productInCart.count++;
        }
        else {
            const product = new product_1.Product(id, name, price);
            this.products.push(product);
        }
    }
    removeProduct(id) {
        this.products = this.products.filter(p => p.id !== id);
    }
    ;
    getTotal() {
        return this.products.reduce((acc, p) => {
            return acc + p.count * p.price;
        }, 0);
    }
    checkout() {
        return !!this.products.length && this.delivery.isSet();
    }
    getProductById(id) {
        return this.products.find(p => p.id === id);
    }
}
const cart = new Cart();
cart.addProduct(1, 'хлеб', 24);
cart.addProduct(1, 'хлеб', 24);
cart.addProduct(1, 'хлеб', 24);
console.log('Total', cart.getTotal());
console.log('Ready for checkout', cart.checkout());
cart.setDelivery(1);
console.log('Ready for checkout', cart.checkout());
