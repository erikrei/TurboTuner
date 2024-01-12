export type TAuthForm = {
    type: string,
    btnName: string
}

export type TAuthBoolean = {
    isAuth: boolean
}

export type TUser = {
    _id?: string,
    username: string,
    password: string
}

export type TUserInfo = {
    _id: string,
    username: string,
    money: number,
    points: number,
    firstLogin: boolean,
    activeCar: TUserCar
}

export type TGeneralCar = {
    _id: string,
    name: string,
    price: number,
    description: string,
    imgName: string,
    imgAlt: string
}

export type TUserCar = {
    _id: string,
    name: string,
    user_id: string,
    tuning_components: TUserCarTuningComponent[],
    tuning_information?: TUserCarTuningInformation
}

export type TUserCarTuningComponent = {
    _id: string,
    component_name: string,
    component_level: number
}

export type TUserCarTuningInformation = {
    component_name: string,
    new_component_level: number,
    tuning_start: number,
    tuning_end: number
}

export type TRemaining = {
    showTime: boolean;
    feedbackMessage: string;
    time?: {
        hours: number;
        minutes: number;
        seconds: number;
    }
};
