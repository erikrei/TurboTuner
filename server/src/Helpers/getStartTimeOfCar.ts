import getQualityMultiplicator from "./getQualityMultiplicator";

export default function getStartTimeOfCar(quality: number): number {
    let startTime = 7200000;
    const qualityMultiplicator = getQualityMultiplicator(quality);


    switch (quality) {
        case 1:
            startTime *= qualityMultiplicator;
            break;
        case 2:
            startTime *= qualityMultiplicator;
            break;
        case 4:
            startTime *= qualityMultiplicator;
            break;
        case 5:
            startTime *= qualityMultiplicator;
            break;
    }

    return startTime;
}
