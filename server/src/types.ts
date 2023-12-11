export type TUser = {
    _id: string,
    username: string,
    password: string
}

export type TUserInfo = {
    _id: string,
    money: number,
    points: number
}

export type TValidInput = {
    feedbackMsg: string,
    statusCode: number
}