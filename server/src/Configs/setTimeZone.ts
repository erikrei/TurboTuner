export default function setTimeZone(timezone: string) {
    process.env.TZ = timezone;
}