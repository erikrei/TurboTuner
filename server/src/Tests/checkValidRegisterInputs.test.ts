import checkValidRegisterInputs from '../Helpers/checkValidRegisterInputs';
import { expect, test } from 'vitest';

import { TValidInput } from '../types';

test('empty username and password', () => {
    const userData: string[] = ['', ''];

    expect(checkValidRegisterInputs(userData)).toStrictEqual<TValidInput>({
        feedbackMsg: 'Benutzername muss aus mindestens 5 Zeichen bestehen.',
        statusCode: 400
    })
})

test('username starts with a number', () => {
    const userData: string[] = ['2dsae', 'dasgn21'];

    expect(checkValidRegisterInputs(userData)).toStrictEqual<TValidInput>({
        feedbackMsg: 'Benutzername muss mit einem Buchstaben beginnen und darf nur aus Buchstaben und Ziffern bestehen.',
        statusCode: 400
    })
})

test('right username but password is too short (< 5)', () => {
    const userData: string[] = ['peter', 'sfas'];

    expect(checkValidRegisterInputs(userData)).toStrictEqual<TValidInput>({
        feedbackMsg: 'Passwort muss mindestens aus 5 Zeichen bestehen.',
        statusCode: 400
    })
})

test('right username and password', () => {
    const userData: string[] = ['admin', 'q2dfhwl28fn'];

    expect(checkValidRegisterInputs(userData)).toStrictEqual<TValidInput>({
        feedbackMsg: 'Benutzer wurde erfolgreich erstellt.',
        statusCode: 201
    })
})
