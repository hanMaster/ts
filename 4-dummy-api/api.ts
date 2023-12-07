const url = 'https://dummyjson.com/users';

enum Gender {
    MALE = 'male',
    FEMALE = 'female'
}

enum BloodGroup {
    A_NEGATIVE = 'A-',
    A_POSITIVE = 'A+',
    B_NEGATIVE = 'B-',
    B_POSITIVE = 'B+',
    AB_NEGATIVE = 'AB-',
    AB_POSITIVE = 'AB+',
    O_NEGATIVE = 'O-',
    O_POSITIVE = 'O+'
}

interface Hair {
    color: string;
    type: string;
}

interface Coordinates {
    lat: string;
    lng: string;
}

interface Address {
    address: string;
    city: string;
    coordinates: Coordinates;
    postalCode: string;
    state: string;
}

interface Bank {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
}

interface Company {
    address: Address;
    department: string;
    name: string;
    title: string;
}

interface User {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: Gender;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: BloodGroup;
    height: number;
    weight: number;
    eyeColor: string;
    hair: Hair;
    domain: string;
    ip: string;
    address: Address;
    macAddress: string;
    university: string;
    bank: Bank;
    company: Company;
    ein: string;
    ssn: string;
    userAgent: string;
}

interface Response {
    users: User[];
    total: number;
    skip: number;
    limit: number;
}

function assertValidResponse(res: unknown): asserts res is Response {
    if (typeof res === 'object' && !!res && 'users' in res) {
        return;
    }
    throw new Error('Invalid data received');
}

async function getUsers(): Promise<User[]> {
    try {
        const response = await fetch(url);
        if (response.status === 200) {
            const data = await response.json();
            assertValidResponse(data);
            return data.users;
        }
        throw new Error('Request failed');
    } catch (e) {
        throw e;
    }
}

(async () => {
    console.log(await getUsers());
})();
