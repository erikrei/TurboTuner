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
    name: string,
    price: number,
    quality: 1 | 2 | 3 | 4 | 5,
    startTime: number,
    description: string,
    imgSrc: string,
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
    component_level: number,
    tuning_cost: number,
    tuning_time: number,
    tuning_improvement: number
}

export type TUserCarTuningInformation = {
    component_name: string,
    new_component_level: number,
    tuning_start: number,
    tuning_end: number,
    fast_tuning?: boolean
}

export type TRaceUser = {
    username: string;
    user_id: string;
}

export type TRaceTime = {
    hours: number,
    minutes: number
}

export type TRaceInformation = {
    users: TRaceUser[]
    race_time: TRaceTime
    race_ranking?: TRaceRanking
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

export type TPatchNotes = {
    version: string
    changes: TPatchNotesChanges[]
}

export type TPatchNotesChanges = {
    subject: string,
    subject_changes: string[]
}

export type TSavedRace = {
    race_ranking: TRaceRanking
    race_time: number
}

export type TScrapyardCar = Omit<TUserCar, 'user_id' | 'tuning_information'>;

export type TScrapyardCarInformation = {
    scrapyardCar: TScrapyardCar
    scrapyardPrice: number
}

export type TSellingCar = Omit<TUserCar, 'tuning_information'> & {
    price: number,
    bids: TSellingCarBid[]
}

export type TSellingCarBid = {
    amount: number,
    bid_user: string
}