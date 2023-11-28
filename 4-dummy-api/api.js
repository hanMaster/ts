"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const url = 'https://dummyjson.com/users';
var Gender;
(function (Gender) {
    Gender["MALE"] = "male";
    Gender["FEMALE"] = "female";
})(Gender || (Gender = {}));
var BloodGroup;
(function (BloodGroup) {
    BloodGroup["A_NEGATIVE"] = "A-";
    BloodGroup["A_POSITIVE"] = "A+";
    BloodGroup["B_NEGATIVE"] = "B-";
    BloodGroup["B_POSITIVE"] = "B+";
    BloodGroup["AB_NEGATIVE"] = "AB-";
    BloodGroup["AB_POSITIVE"] = "AB+";
    BloodGroup["O_NEGATIVE"] = "O-";
    BloodGroup["O_POSITIVE"] = "O+";
})(BloodGroup || (BloodGroup = {}));
function assertValidResponse(res) {
    if (typeof res === 'object' && !!res && 'users' in res) {
        return;
    }
    throw new Error('Invalid data received');
}
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            if (response.status === 200) {
                const data = yield response.json();
                assertValidResponse(data);
                return data.users;
            }
            throw new Error('Request failed');
        }
        catch (e) {
            throw e;
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log(yield getUsers());
}))();
