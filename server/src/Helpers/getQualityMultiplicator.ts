export default function getQualityMultiplicator(quality: number = 3): number {
    switch (quality) {
        case 1:
            return .9;
        case 2:
            return .95;
        case 4:
            return 1.05;
        case 5:
            return 1.1;
        default: return 1
    }
} 