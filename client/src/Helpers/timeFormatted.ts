export default function timeFormatted(hours: number, minutes: number): string {
    let formatted = '';
    if (hours < 10) {
        formatted += `[0${hours}:`;
    } else {
        formatted += `[${hours}:`;
    }

    if (minutes === 0) {
        formatted += `00]`;
    } else {
        formatted += `${minutes}]`;
    }

    return formatted;
}