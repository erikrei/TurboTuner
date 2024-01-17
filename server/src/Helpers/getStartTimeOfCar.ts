export default function getStartTimeOfCar(quality: number): number {
    let startTime = 7200000;

    switch (quality) {
        case 1:
            startTime *= 1.1;
            break;
        case 2:
            startTime *= 1.05;
            break;
        case 4:
            startTime *= .95;
            break;
        case 5:
            startTime *= .9;
            break;
    }

    return startTime;
}
