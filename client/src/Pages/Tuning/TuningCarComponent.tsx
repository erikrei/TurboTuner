import { useContext } from "react";
import axios from "axios";

import { TUserCarTuningComponent, TUserInfo } from "../../types";

import { UserInfoContext } from "../DashboardLayout";

import { useTuningContext } from "../../Contexts/TuningContext";

import getTuningCost from "../../Helpers/getTuningCost";
import getDisableButton from "../../Helpers/getDisableButton";

type TuningCarComponentProps = {
  component: TUserCarTuningComponent;
  handleTuning: (component: TUserCarTuningComponent) => void;
};

export default function TuningCarComponent({
  component,
  handleTuning,
}: TuningCarComponentProps) {
  const { selectedCar } = useTuningContext();
  const userInfo = useContext(UserInfoContext);
  const money = userInfo?.userInfo.money;

  const component_price = getTuningCost(component);

  const disableButton = getDisableButton(
    selectedCar?.tuning_information,
    money,
    component_price
  );

  function handleTuningCost() {
    money &&
      axios
        .put(
          "http://localhost:3000/userInfo",
          {
            money: money - component_price,
          },
          {
            withCredentials: true,
          }
        )
        .then(({ data }: { data: TUserInfo }) => {
          userInfo.setUserInfo(data);
        });
  }

  return (
    <div className="car-component">
      <p>COMPONENT_NAME: {component.component_name}</p>
      <p>COMPONENT_LEVEL: {component.component_level}</p>
      <p>TUNING_COST: {component_price} €</p>
      <button
        onClick={() => {
          handleTuning(component);
          handleTuningCost();
        }}
        disabled={disableButton}
      >
        {component.component_name} tunen
      </button>
    </div>
  );
}
