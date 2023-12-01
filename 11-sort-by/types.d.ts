declare module 'sort-by' {
    function sortBy<T>(...args: readonly string[]): (obj1: T, obj2: T) => number;
    export = sortBy;
}
