class User {
    @allowFunc((v: number) => v > 0)
    age: number = 30;
}

function allowFunc(func: (value: number) => boolean) {
    return (target: Object, propertKey: string | symbol) => {
        let value: number;
        const setter = function (newValue: number) {
            if (func(newValue)) {
                value = newValue;
            }
        };
        const getter = function () {
            return value;
        };

        Object.defineProperty(target, propertKey, {
            set: setter,
            get: getter
        });
    };
}

const person = new User();
console.log(person.age);

person.age = 0;
console.log(person.age);

person.age = 20;
console.log(person.age);
