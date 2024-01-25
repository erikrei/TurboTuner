import { FaRegHourglass } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

import getTimeFormatted from "../../../Helpers/getTimeFormatted";

type DashboardTuninganzeigeCarContentTimeProps = {
  tuning_end: number;
};

export default function DashboardTuninganzeigeCarContentTime({
  tuning_end,
}: DashboardTuninganzeigeCarContentTimeProps) {
  const dateNow = new Date();
  const dateEnd = new Date(tuning_end);
  const isFinished = dateEnd < dateNow;

  return (
    <div className="tuninganzeige-car-content-time">
      {isFinished ? (
        <span className="finished">
          Tuning fertig
          <TiTick />
        </span>
      ) : (
        <span className="pending">
          {getTimeFormatted(dateEnd.getHours(), dateEnd.getMinutes(), true)}
          <FaRegHourglass />
        </span>
      )}
    </div>
  );
}
