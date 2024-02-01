import MarketUsedDealerUserCars from "./MarketUsedDealerUserCars";
import MarketUsedDealerSellingCars from "./MarketUsedDealerSellingCars";

import UsedDealerSellingContextProvider from "../../../../Contexts/UsedDealerSellingContext";

export default function MarketUsedDealerSell() {
  return (
    <UsedDealerSellingContextProvider>
      <MarketUsedDealerUserCars />
      <MarketUsedDealerSellingCars />
    </UsedDealerSellingContextProvider>
  );
}
