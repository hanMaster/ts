const obj: Record<string, number> = {
    a: 1,
    b: 2
};

type RecordType = string | number | symbol;

function swapKeysAndValues<T extends RecordType, M extends RecordType>(
    o: Record<T, M>
): Record<M, T> {
    const swapped = Object.entries(o).map(([key, value]) => [value, key]);

    return Object.fromEntries(swapped);
}

const res = swapKeysAndValues(obj);

console.log(res);
