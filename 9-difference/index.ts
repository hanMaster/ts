interface IA {
    a: number;
    b: string;
}

interface IB {
    a: number;
    c: boolean;
}

let a: IA = { a: 5, b: '' };
let b: IB = { a: 10, c: true };

type Key = string | number | symbol;

function difference<A extends Record<Key, any>, B extends Record<Key, any>>(
    obj1: A,
    obj2: B
): Omit<A, keyof B> {
    const res = { ...obj1 };
    const toExclude = Object.keys(obj2);
    toExclude.forEach((k) => delete res[k]);
    return res;
}

const res = difference(a, b);

console.log(res);
