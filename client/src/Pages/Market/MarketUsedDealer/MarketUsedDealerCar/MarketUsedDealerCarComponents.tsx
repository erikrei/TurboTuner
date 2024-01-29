import { TUserCarTuningComponent } from "../../../../types";

import MarketUsedDealerCarSingleComponent from "./MarketUsedDealerCarSingleComponent";

type MarketUsedDealerCarTextComponentsProps = {
  components: TUserCarTuningComponent[];
};

export default function MarketUsedDealerCarComponents({
  components,
}: MarketUsedDealerCarTextComponentsProps) {
  return (
    <div className="car-components">
      {components.map((component) => (
        <MarketUsedDealerCarSingleComponent
          component={component}
          key={component._id}
        />
      ))}
    </div>
  );
}
