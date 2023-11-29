/**
 *  Декоратор, который добавляет свойство
 *  createdAt в класс, фиксируя дату создания
 */

interface IUserService {
    users: number;
    getUsersInDatabase(): number;
}

type createdAt = {
    createdAt: Date;
};

@CreateAt
class UserSerivce implements IUserService {
    users: number = 1000;
    getUsersInDatabase(): number {
        return this.users;
    }
}

function CreateAt<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        createdAt = new Date();
    };
}

console.log((new UserSerivce() as IUserService & createdAt).createdAt);
