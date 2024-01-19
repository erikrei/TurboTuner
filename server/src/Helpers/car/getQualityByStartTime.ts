export default function getQualityByStartTime(startTime: number): number {
    switch (startTime) {
        case 7920000: return 1;
        case 7560000: return 2;
        case 6840000: return 4;
        case 6480000: return 5;
        default: return 3;
    }
}