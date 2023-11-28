interface IHaveId {
    id: number;
}

type Direction = 'asc' | 'desc';

const data = [
    { id: 2, name: 'Петя' },
    { id: 1, name: 'Вася' },
    { id: 3, name: 'Надя' }
];

function sortObject<T extends IHaveId>(
    obj: Array<T>,
    sortDirection: Direction
): Array<T> {
    return obj.sort((a, b) => {
        if (sortDirection === 'asc') {
            return a.id - b.id;
        } else {
            return b.id - a.id;
        }
    });
}

console.log(sortObject(data, 'asc'));
console.log(sortObject(data, 'desc'));
