import { useContext } from "react";
import axios from "axios";

import { TUserCarTuningComponent, TUserInfo } from "../../types";

import { UserInfoContext } from "../DashboardLayout";

import TuningComponentTime from "./TuningComponentTime";
import TuningButton from "./TuningButton";

type TuningCarComponentProps = {
  component: TUserCarTuningComponent;
  handleTuning: (
    component: TUserCarTuningComponent,
    fast_tuning?: boolean
  ) => void;
};

export default function TuningCarComponent({
  component,
  handleTuning,
}: TuningCarComponentProps) {
  const userInfo = useContext(UserInfoContext);
  const money = userInfo?.userInfo.money;

  const component_price = component.tuning_cost;

  function handleTuningCost(fast_tuning: boolean = false) {
    if (money) {
      const moneyToSpend = fast_tuning
        ? component_price * 1.3
        : component_price;
      axios
        .put(
          "http://localhost:3000/userInfo",
          {
            money: money - moneyToSpend,
          },
          {
            withCredentials: true,
          }
        )
        .then(({ data }: { data: TUserInfo }) => {
          userInfo.setUserInfo(data);
        });
    }
  }

  return (
    <div className="car-component">
      <p>COMPONENT_NAME: {component.component_name}</p>
      <p>COMPONENT_LEVEL: {component.component_level}</p>
      <p>TUNING_COST: {component_price} €</p>
      <p>FAST_TUNING_COST: {component_price * 1.3} €</p>
      <TuningComponentTime tuningTime={component.tuning_time} />
      <TuningButton
        component={component}
        handleTuning={handleTuning}
        handleTuningCost={handleTuningCost}
        userMoney={money}
      />
      <TuningButton
        component={component}
        handleTuning={handleTuning}
        handleTuningCost={handleTuningCost}
        fast_tuning={true}
        userMoney={money}
      />
    </div>
  );
}
