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

export type TMarketCard = {
    name: string,
    imgSrc: string,
    description: string,
    path: string
}

export type TGeneralCar = {
    _id: string,
    name: string,
    price: number,
    description: string,
    imgSrc: string,
    quality: 1 | 2 | 3 | 4 | 5,
    startTime: number
}

export type TUserCar = {
    _id: string,
    name: string,
    user_id: string,
    tuning_components: TUserCarTuningComponent[],
    tuning_information?: TUserCarTuningInformation
}

export type TUserCarTuningCancel = {
    userCarResponse: TUserCar;
    moneyToReturn: number
}

export type TUserCarTuningComponent = {
    _id: string,
    component_name: string,
    component_level: number,
    tuning_cost: number,
    tuning_time: number,
    tuning_improvement: number
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

export type TRaceUser = {
    username: string;
    user_id: string;
}

export type TRaceTime = {
    hours: number,
    minutes: number
}

export type TRaceInformation = {
    users: TRaceUser[],
    race_time: TRaceTime,
    race_ranking?: TRaceRanking
    _id: string
}


export type TRaceRankingUser = {
    ranking: number
    username: string
    winnings: number
    claimedWinnings: boolean
    carTime: string
}

export type TRaceRanking = {
    users: TRaceRankingUser[]
}