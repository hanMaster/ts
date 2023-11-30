/**
 *  Декоратор, который добавляет обработку исключений
 */

interface UserServiceInterface {
    users: number;
    getUsersInDatabase(): number;
}

class UserSerivce2 implements UserServiceInterface {
    @Max(100)
    users: number = 1000;

    @Catch({ rethrow: true })
    getUsersInDatabase(): number {
        // throw new Error('Error happened');
        console.log('this', this);

        return this.users;
    }
}

function Catch({ rethrow }: { rethrow: boolean } = { rethrow: false }) {
    return (
        target: Object,
        _: string | symbol,
        descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
    ): TypedPropertyDescriptor<(...args: any[]) => any> | void => {
        const method = descriptor.value;
        console.log('target', Object.getOwnPropertyNames(target));

        descriptor.value = (...args: any[]) => {
            try {
                return method?.bind(target)(args);
            } catch (e) {
                if (e instanceof Error) {
                    console.error('Error in getUsersInDatabase: ', e.message);
                    if (rethrow) {
                        throw e;
                    }
                }
            }
        };
    };
}

function Max(max: number) {
    return (target: Object, propertKey: string | symbol) => {
        let value: number;
        const setter = function (newValue: number) {
            if (newValue > max) {
                console.log(`Нельзя присвоить значение больше ${max}`);
            } else {
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

const userSevice = new UserSerivce2();
userSevice.users = 1;
console.log(userSevice.users);
