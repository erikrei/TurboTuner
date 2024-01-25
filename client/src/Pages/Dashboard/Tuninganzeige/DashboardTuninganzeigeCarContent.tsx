import { TUserCarTuningInformation } from "../../../types";

import DashboardTuninganzeigeCarContentComponent from "./DashboardTuninganzeigeCarContentComponent";
import DashboardTuninganzeigeCarContentTime from "./DashboardTuninganzeigeCarContentTime";

type DashboardTuninganzeigeCarContentProps = {
  tuning_information: TUserCarTuningInformation;
};

export default function DashboardTuninganzeigeCarContent({
  tuning_information,
}: DashboardTuninganzeigeCarContentProps) {
  return (
    <div className="tuninganzeige-car-content">
      <DashboardTuninganzeigeCarContentComponent
        component_name={tuning_information.component_name}
        new_component_level={tuning_information.new_component_level}
      />
      <DashboardTuninganzeigeCarContentTime
        tuning_end={tuning_information.tuning_end}
      />
    </div>
  );
}
