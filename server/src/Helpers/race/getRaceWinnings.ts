export default function getRaceWinnings(ranking: number): number {
    if (ranking === 1) return 500000;

    if (ranking === 2) return 400000;

    if (ranking === 3) return 350000;

    if (ranking >= 4 && ranking <= 10) return 300000;

    if (ranking >= 11 && ranking <= 25) return 250000;

    if (ranking >= 26 && ranking <= 50) return 200000;

    return 150000;
}