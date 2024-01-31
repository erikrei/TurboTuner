import { TError } from "../types";

export default function checkIntegerInput(inputValue: string, price?: number, userMoney?: number): TError {
    const inputValueNumber = Number(inputValue);

    const errorObj: TError = {
        showError: false,
        errorMessage: ''
    }

    if (!inputValueNumber) {
        errorObj.showError = true;
        errorObj.errorMessage = "Du musst eine gültige Zahl eingeben.";
    } else if (inputValue.indexOf(".") !== -1) {
        errorObj.showError = true;
        errorObj.errorMessage = "Die Zahl darf keine Nachkommastellen enthalten.";
    } else {
        if (price) {
            if (inputValueNumber >= price) {
                errorObj.showError = true;
                errorObj.errorMessage = "Das Gebot kann nicht gleich oder über dem Preis sein.";
            } else if (inputValueNumber < price * 0.8) {
                errorObj.showError = true;
                errorObj.errorMessage = "Das Angebot kann nicht unter 80% des Preises liegen.";
            }
        }
    }

    if (!errorObj.showError) {
        if ((!userMoney && userMoney === 0) || (userMoney && userMoney < inputValueNumber)) {
            errorObj.showError = true;
            errorObj.errorMessage = "Du hast nicht genug Geld für das Angebot."
        }

    }

    return errorObj;
}