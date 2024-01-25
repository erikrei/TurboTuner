export default function getTimeFormatted(hours: number, minutes: number, withParantheses?: boolean): string {
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

    if (withParantheses) {
        formatted = formatted.replace('[', '');
        formatted = formatted.replace(']', '')
    }

    return formatted;
}