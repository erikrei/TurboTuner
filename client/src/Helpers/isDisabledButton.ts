import { TUserCarTuningInformation } from "../types";

type TIsDisabledButtonInformation = {
    disabledButton: boolean;
    disabledFeedback: string
}

export default function isDisabledButton(tuning_information: TUserCarTuningInformation | undefined, currentMoney: number | undefined, tuning_cost: number, fast_tuning: boolean = false): TIsDisabledButtonInformation {
    const disabledButtonInformation: TIsDisabledButtonInformation = {
        disabledButton: false,
        disabledFeedback: ''
    }

    if (tuning_information && tuning_information.tuning_end > new Date().getTime()) {
        disabledButtonInformation.disabledButton = true;
        disabledButtonInformation.disabledFeedback = 'Auto ist schon am tunen.';
        return disabledButtonInformation;
    }

    if (fast_tuning) {
        tuning_cost = tuning_cost * 1.3;
    }

    if ((currentMoney || currentMoney === 0) && currentMoney < tuning_cost) {
        disabledButtonInformation.disabledButton = true;
        disabledButtonInformation.disabledFeedback = 'Zu wenig Geld.';
    }

    return disabledButtonInformation;
}