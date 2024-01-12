import { TUserCarTuningInformation } from "../types";

export default function getDisableButton(tuning_information: TUserCarTuningInformation | undefined, currentMoney: number | undefined, tuning_cost: number): boolean {
    if (tuning_information && tuning_information.tuning_end > new Date().getTime()) {
        return true;
    }

    if (currentMoney && currentMoney < tuning_cost) {
        return true;
    }

    return false;
}