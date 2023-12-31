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
    user_id?: string,
}