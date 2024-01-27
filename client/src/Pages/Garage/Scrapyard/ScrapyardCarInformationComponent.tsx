import { TUserCarTuningComponent } from "../../../types";

type ScrapyardCarInformationComponentProps = {
  component: TUserCarTuningComponent;
};

export default function ScrapyardCarInformationComponent({
  component,
}: ScrapyardCarInformationComponentProps) {
  return (
    <p className="car-information-component">
      {component.component_name + ": " + component.component_level}
    </p>
  );
}
