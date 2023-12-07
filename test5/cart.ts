import { Delivery } from "./delivery";
import { Product } from "./product";

class Cart {
    private products: Product[] = [];
    private delivery: Delivery = new Delivery();

    setDelivery(destination: string | number, date?: string | Date): void {
        if (typeof destination === 'string') {
            this.delivery = Delivery.create().toHome(destination).at(date ?? new Date());
        } else {
            this.delivery = Delivery.create().toDropPoint(destination);
        }
    }

    addProduct(id: number, name: string, price: number): void {
        const productInCart = this.getProductById(id);
        if (productInCart) {
            productInCart.count++;
        } else {
            const product = new Product(id, name, price);
            this.products.push(product);
        }
    }

    removeProduct(id: number) {
        this.products = this.products.filter(p => p.id !== id);
    };

    getTotal(): number {
        return this.products.reduce((acc, p) => {
            return acc + p.count * p.price;
        }, 0);
    }

    checkout(): boolean {
        return !!this.products.length && this.delivery.isSet();
    }

    private getProductById(id: number): Product | undefined {
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


