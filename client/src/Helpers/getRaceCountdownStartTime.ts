export default function getRaceCountdownTime(): number {
    const nowDate = new Date();
    const nowMinutes = nowDate.getMinutes();
    const nowSeconds = nowDate.getSeconds();
    const nowMilliseconds = nowDate.getMilliseconds();
    let remainingMinutes = 0;

    if (nowMinutes >= 0) {
        remainingMinutes = 15 - nowMinutes;
    }

    if (nowMinutes >= 15) {
        remainingMinutes = 30 - nowMinutes;
    }

    if (nowMinutes >= 30) {
        remainingMinutes = 45 - nowMinutes;
    }

    if (nowMinutes >= 45) {
        remainingMinutes = 60 - nowMinutes;
    }

    remainingMinutes -= 1;

    const totalMS = (1000 * 60 * remainingMinutes) + (60000 - 1000 * nowSeconds) - nowMilliseconds;

    return new Date(totalMS).getTime();

}