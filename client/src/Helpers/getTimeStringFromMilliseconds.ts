export default function getTimeStringFromMilliseconds(ms: number): string {
    const dateFromMS = new Date(ms - 3600000);
    const dateHours = dateFromMS.getHours();
    const dateMinutes = dateFromMS.getMinutes();
    const dateSeconds = dateFromMS.getSeconds();

    let timeString = "";

    if (dateHours > 0) {
        timeString += dateHours + 'h';
    }

    if (dateMinutes > 0) {
        timeString += dateMinutes + 'min';
    }

    if (dateSeconds > 0) {
        timeString += dateSeconds + 's'
    }

    return timeString;
}