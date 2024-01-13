type TuningComponentTimeProps = {
  tuningTime: number;
};

export default function TuningComponentTime({
  tuningTime,
}: TuningComponentTimeProps) {
  const tuningTimeDate = new Date(tuningTime - 3600000);
  const tuningTimeFast = new Date(tuningTime * 0.8 - 3600000);

  return (
    <>
      <p>
        TUNING_TIME:{" "}
        {tuningTimeDate.getHours() !== 0 && (
          <span>{tuningTimeDate.getHours()} Stunden </span>
        )}
        {tuningTimeDate.getMinutes() !== 0 && (
          <span>{tuningTimeDate.getMinutes()} Minuten </span>
        )}
        {tuningTimeDate.getSeconds() !== 0 && (
          <span>{tuningTimeDate.getSeconds()} Sekunden </span>
        )}
      </p>
      <p>
        FAST_TUNING_TIME:{" "}
        {tuningTimeFast.getHours() !== 0 && (
          <span>{tuningTimeFast.getHours()} Stunden </span>
        )}
        {tuningTimeFast.getMinutes() !== 0 && (
          <span>{tuningTimeFast.getMinutes()} Minuten </span>
        )}
        {tuningTimeFast.getSeconds() !== 0 && (
          <span>{tuningTimeFast.getSeconds()} Sekunden </span>
        )}
      </p>
    </>
  );
}
