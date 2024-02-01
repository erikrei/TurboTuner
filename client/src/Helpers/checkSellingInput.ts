export default function checkSellingInput(price: number): boolean {
    if (price <= 0) {
        return false;
    } else if (price % 1 > 0) {
        return false
    }

    return true;
}