const data = [
    { group: 1, name: 'a' },
    { group: 1, name: 'b' },
    { group: 2, name: 'c' }
];

interface IGroupBy<T> {
    [key: string]: T[];
}

type Key = string | number | symbol;

function groupBy<T extends Record<Key, any>>(
    arr: T[],
    key: keyof T
): IGroupBy<T> {
    const res: IGroupBy<T> = {};
    const uniqueValues = new Set();
    arr.forEach((i) => uniqueValues.add(i[key]));
    uniqueValues.forEach((val) => {
        res[val as string] = arr.filter((item) => item[key] === val);
    });

    return res;
}

const res = groupBy(data, 'group');
console.log(res);
