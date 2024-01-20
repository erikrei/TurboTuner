export default function getCarTimeReadableString(carTime: number): string {
    const carTimeDate = new Date(-3600000 + carTime);
    let carTimeString = "";

    if (carTimeDate.getHours() > 0) {
        carTimeString += `${carTimeDate.getHours()}h`
    }

    carTimeString += ` ${carTimeDate.getMinutes()}min`;

    carTimeString += ` ${carTimeDate.getSeconds()}sek`;

    return carTimeString;

}