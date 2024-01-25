import { useState, useEffect } from "react";

import getRaceCountdownTime from "../../../Helpers/getRaceCountdownStartTime";

export default function DashboardRennenCountdownTimer() {
  const [timer, setTimer] = useState(getRaceCountdownTime());
  const timerDate = new Date(timer);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer(getRaceCountdownTime());
    }, 1000);
    console.log(timer);
    return () => clearInterval(timerInterval);
  }, [timer]);

  return (
    <span>
      {timerDate.getMinutes() + " Minuten"}{" "}
      {timerDate.getSeconds() + " Sekunden"}
    </span>
  );
}
