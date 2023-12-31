export type TUser = {
    _id: string,
    username: string,
    password: string
}

export type TUserInfo = {
    _id: string,
    username: string,
    money: number,
    points: number,
    firstLogin: boolean,
    activeCar?: TUserCar
}

export type TValidInput = {
    feedbackMsg: string,
    statusCode: number
}

export type TGeneralCar = {
    _id: string,
    name: string,
    price: number
}

export type TUserCar = {
    _id: string,
    name: string,
    user_id: string,
    tuning_components: TUserCarTuningComponents[],
    tuning_information?: TUserCarTuningInformation
}

export type TUserCarTuningComponents = {
    component_name: string,
    component_level: number
}

export type TUserCarTuningInformation = {
    component_name: string,
    new_component_level: number,
    tuning_start: number,
    tuning_end: number
}