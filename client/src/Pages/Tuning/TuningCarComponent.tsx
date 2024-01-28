import axios from "axios";

import { TUserCarTuningComponent, TUserInfo } from "../../types";

import { useUserInfo } from "../../Contexts/UserInfoContext";

import TuningComponentTime from "./TuningComponentTime";
import TuningButton from "./TuningButton";
import TuningErrorFeedback from "./TuningErrorFeedback";

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
  const { userInfo, setUserInfo } = useUserInfo();

  const money = userInfo?.money;

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
            points: userInfo.points + Math.round(moneyToSpend / 1000),
          },
          {
            withCredentials: true,
          }
        )
        .then(({ data }: { data: TUserInfo }) => {
          setUserInfo(data);
        });
    }
  }

  return (
    <div className="car-component">
      <p>COMPONENT_NAME: {component.component_name}</p>
      <p>COMPONENT_LEVEL: {component.component_level}</p>
      {component.tuning_improvement >= 0 ? (
        <>
          <p>TUNING_COST: {component_price.toFixed(0)} €</p>
          <p>FAST_TUNING_COST: {(component_price * 1.3).toFixed(0)} €</p>
          <TuningComponentTime tuningTime={component.tuning_time} />
          <p>VERBESSERUNG: {component.tuning_improvement / 1000} Sekunden</p>
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
        </>
      ) : (
        <span>
          Die Komponente ist auf dem maximalen Level und kann nicht mehr
          verbessert werden.
        </span>
      )}
      <TuningErrorFeedback
        component_price={component_price}
        money={userInfo?.money}
      />
    </div>
  );
}
