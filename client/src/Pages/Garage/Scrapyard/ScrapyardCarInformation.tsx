import ScrapyardCarInformationComponent from "./ScrapyardCarInformationComponent";

import { TUserCar } from "../../../types";

type ScrapyardCarInformationProps = {
  userCar: TUserCar;
};

export default function ScrapyardCarInformation({
  userCar,
}: ScrapyardCarInformationProps) {
  return (
    <div className="car-information">
      <h2>{userCar.name} schrotten</h2>
      {userCar.tuning_components.map((component) => (
        <ScrapyardCarInformationComponent
          key={component._id}
          component={component}
        />
      ))}
    </div>
  );
}
