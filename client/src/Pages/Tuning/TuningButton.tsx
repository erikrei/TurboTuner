import { TUserCarTuningComponent } from "../../types";

import { useTuningContext } from "../../Contexts/TuningContext";

import isDisabledButton from "../../Helpers/isDisabledButton";

type TuningButtonProps = {
  component: TUserCarTuningComponent;
  fast_tuning?: boolean;
  handleTuning: (
    component: TUserCarTuningComponent,
    fast_tuning?: boolean
  ) => void;
  handleTuningCost: (fast_tuning?: boolean) => void;
  userMoney: number | undefined;
};

export default function TuningButton({
  component,
  fast_tuning,
  userMoney,
  handleTuning,
  handleTuningCost,
}: TuningButtonProps) {
  const { selectedCar } = useTuningContext();

  const disableButton = isDisabledButton(
    selectedCar?.tuning_information,
    userMoney,
    component.tuning_cost,
    fast_tuning
  );

  return (
    <div className="tuning-button-container">
      <button
        onClick={() => {
          handleTuning(component, fast_tuning);
          handleTuningCost(fast_tuning);
        }}
        disabled={disableButton.disabledButton}
      >
        {component.component_name} {fast_tuning && "schnell"} tunen
      </button>
    </div>
  );
}
