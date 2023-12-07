import { TValidInput } from "../types";

export default function checkValidRegisterInputs(properties: string[]): TValidInput {
    const usernameRegex = new RegExp('^[a-zA-Z][a-zA-z0-9]*$');

    const [username, password] = properties;

    const validInput: TValidInput = {
        feedbackMsg: '',
        statusCode: 400
    };

    if (username.length < 5) {
        validInput.feedbackMsg = 'Benutzername muss aus mindestens 5 Zeichen bestehen.';
    } else if (!usernameRegex.test(username)) {
        validInput.feedbackMsg = 'Benutzername muss mit einem Buchstaben beginnen und darf nur aus Buchstaben und Ziffern bestehen.';
    } else if (password.length < 5) {
        validInput.feedbackMsg = 'Passwort muss mindestens aus 5 Zeichen bestehen.';
    } else {
        validInput.feedbackMsg = 'Benutzer wurde erfolgreich erstellt.';
        validInput.statusCode = 201;
    }

    return validInput;
}