type mapValue = string | number | boolean | object;

class Bucket {
    #key: string = '';
    #value: mapValue = '';
    #next: Bucket | null = null;

    getValue(key: string): mapValue | undefined {
        if (this.#key === key) {
            return this.#value;
        }
        let item = this.#next;
        while (item !== null) {
            if (item.#key === key) {
                return item.#value;
            }
            item = item.#next;
        }
    }

    #getItem(key: string): Bucket | undefined {
        if (this.#key === key) {
            return this;
        }
        let item = this.#next;
        while (item !== null) {
            if (item.#key === key) {
                return item;
            }
            item = item.#next;
        }
    }

    #getLastItem(): Bucket {
        let item = this as Bucket;
        while (item.#next !== null) {
            item = item.#next;
        }
        return item;
    }

    setItem(key: string, value: mapValue) {
        const item = this.#getItem(key);
        if (item) {
            item.#value = value;
            return;
        }

        const lastItem = this.#getLastItem();
        if (lastItem.#key) {
            lastItem.#next = new Bucket();
            lastItem.#next.#key = key;
            lastItem.#next.#value = value;
        } else {
            lastItem.#key = key;
            lastItem.#value = value;
        }
    }

    deleteValue(key: string): mapValue | undefined {
        let item = this.#getItem(key);
        let res;
        if (item) {
            res = item.#value;
            if (item.#next !== null) {
                item.#key = item.#next.#key;
                item.#value = item.#next.#value;
                item.#next = item.#next.#next;
            } else {
                item.#key = '';
                item.#value = '';
            }
        }

        return res;
    }
}

class MyMap {
    #buckets = this.clear();

    set(key: string, value: mapValue) {
        this.#buckets[this.#hash(key)].setItem(key, value);
    }

    get(key: string) {
        return this.#buckets[this.#hash(key)].getValue(key);
    }

    delete(key: string) {
        return this.#buckets[this.#hash(key)].deleteValue(key);
    }

    clear() {
        const arr = new Array<Bucket>(256);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = new Bucket();
        }
        return arr;
    }

    #hash(str: string) {
        let h = 0;
        for (let i = 0; i < str.length; i++) {
            h += str.charCodeAt(i) * i;
        }
        return h % 256;
    }
}

const map = new MyMap();

map.set('ab', 6);
map.set('ba', 7);
map.set('bb', 'bla bla');

console.log('ab', map.get('ab'));
console.log('ba', map.get('ba'));
console.log('bb', map.get('bb'));

map.delete('ab');

console.log('ab', map.get('ab'));
console.log('ba', map.get('ba'));
console.log('bb', map.get('bb'));
