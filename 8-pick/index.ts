const user = {
    name: 'Vasiliy',
    age: 8,
    skills: ['typescript', 'javascript']
};

type Key = string | number | symbol;

interface IResult {
    [key: Key]: any;
}

function pickObjectKeys<T extends Record<Key, any>>(
    obj: T,
    props: Array<keyof T>
): IResult {
    return props.reduce(function (result, prop) {
        result[prop] = obj[prop];
        return result;
    }, {} as IResult);
}

const res = pickObjectKeys(user, ['age', 'skills']);

console.log(res);
