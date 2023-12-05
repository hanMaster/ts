interface IteratorInterface<T> {
    current(): T | undefined;
    next(): T | undefined;
    prev(): T | undefined;
    index(): number;
}

interface Row {
    id: number;
    date: string;
    title: string;
}

const dataForIterate: Row[] = [
    { id: 4, date: '01-02-2023', title: 'test4' },
    { id: 1, date: '04-01-2023', title: 'test1' },
    { id: 3, date: '07-02-2023', title: 'test3' },
    { id: 2, date: '02-01-2023', title: 'test2' }
];

abstract class AbstractIterator<T> implements IteratorInterface<T> {
    private position: number = 0;
    protected data: T[] = [];

    current(): T | undefined {
        return this.data[this.position];
    }

    next(): T | undefined {
        this.position++;
        return this.data[this.position];
    }
    prev(): T | undefined {
        this.position--;
        return this.data[this.position];
    }

    index(): number {
        return this.position;
    }
}

class IdIterator extends AbstractIterator<Row> {
    static from(data: Row[], direction: 'asc' | 'desc' = 'asc') {
        const iterator = new IdIterator();
        iterator.data = data.sort((a, b) =>
            direction === 'asc' ? a.id - b.id : b.id - a.id
        );
        return iterator;
    }
}

class DateIterator extends AbstractIterator<Row> {
    static from(data: Row[], direction: 'asc' | 'desc' = 'asc') {
        const iterator = new DateIterator();
        iterator.data = data.sort((a, b) =>
            direction === 'asc'
                ? new Date(a.date).getTime() - new Date(b.date).getTime()
                : new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        return iterator;
    }
}

const idIterator = IdIterator.from(dataForIterate, 'desc');

console.log(idIterator.current());
console.log(idIterator.next());
console.log(idIterator.next());
console.log(idIterator.next());
console.log(idIterator.prev());

/**
 * { id: 4, date: '01-02-2023', title: 'test4' }
 * { id: 3, date: '07-02-2023', title: 'test3' }
 * { id: 2, date: '02-01-2023', title: 'test2' }
 * { id: 1, date: '04-01-2023', title: 'test1' }
 * { id: 2, date: '02-01-2023', title: 'test2' }
 */

const dateIterator = DateIterator.from(dataForIterate, 'desc');

console.log(dateIterator.current());
console.log(dateIterator.next());
console.log(dateIterator.next());
console.log(dateIterator.next());
console.log(dateIterator.prev());

/**
 * { id: 3, date: '07-02-2023', title: 'test3' }
 * { id: 1, date: '04-01-2023', title: 'test1' }
 * { id: 2, date: '02-01-2023', title: 'test2' }
 * { id: 4, date: '01-02-2023', title: 'test4' }
 * { id: 2, date: '02-01-2023', title: 'test2' }
 */
