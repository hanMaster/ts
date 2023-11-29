/**
 * Вывести тип для результата валидации формы, основываясь на типе формы
 */

interface IForm {
    name: string;
    password: string;
}

const form: IForm = {
    name: 'Вася',
    password: '123'
};

type FormToValidation<T> = {
    [Field in keyof T]: { isValid: boolean; errorMessage?: string };
};

const formValidation: FormToValidation<IForm> = {
    name: { isValid: true },
    password: { isValid: false, errorMessage: 'Должен быть длиннее 5 символов' }
};
