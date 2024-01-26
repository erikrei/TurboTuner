export default function getTimeFormatted(hours: number, minutes: number, withParantheses?: boolean): string {
    let formatted = '';
    if (hours < 10) {
        formatted += `[0${hours}:`;
    } else {
        formatted += `[${hours}:`;
    }

    if (minutes < 10) {
        formatted += `0${minutes}]`;
    } else {
        formatted += `${minutes}]`;
    }

    if (withParantheses) {
        formatted = formatted.replace('[', '');
        formatted = formatted.replace(']', '')
    }

    return formatted;
}