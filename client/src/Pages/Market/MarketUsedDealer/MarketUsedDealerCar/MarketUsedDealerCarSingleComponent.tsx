import { TUserCarTuningComponent } from "../../../../types";

type MarketUsedDealerCarSingleComponent = {
  component: TUserCarTuningComponent;
};

export default function MarketUsedDealerCarSingleComponent({
  component,
}: MarketUsedDealerCarSingleComponent) {
  return (
    <div className="single-component">
      <span>{component.component_name}</span>
      <span>{component.component_level}</span>
    </div>
  );
}
