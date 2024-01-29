import { Outlet } from "react-router-dom";

import MarketUsedDealerNavigation from "./MarketUsedDealerNavigation";

export default function MarketUsedDealer() {
  return (
    <>
      <h1 className="content-headline">Gebrauchtwagenhändler</h1>
      <section className="used-cars-container tmp-bg">
        <MarketUsedDealerNavigation />
        <Outlet />
      </section>
    </>
  );
}
