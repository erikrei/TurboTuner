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
    _id: string
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
    _id: string
    amount: number
    bid_user: string
}

export type TBuyingCarBid = {
    _id: string
    name: string
    bids: {
        amount: number
    }[]
}

export type TError = {
    showError: boolean
    errorMessage: string
}

export type TBuildings = {
    user_id: string
    buildings: TBuildingInformation[]
}

export type TBuildingInformation = {
    _id: string
    buildingName: string
    buildingLevel: number
    buildingMaximumLevel: number
    buildingBaseCost: number
    buildingBaseTime: number
    buildingLevelUpCost: number
    buildingLevelUpTime: number
    buildingImprovement?: TBuildingImprovement
}

export type TBuildingImprovement = {
    buildingNextLevel: number
    buildingImprovementStart: number
    buildingImprovementEnd: number
}