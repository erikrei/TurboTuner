import { NavLink } from "react-router-dom";

export default function MarketUsedDealerNavigation() {
  return (
    <nav>
      <NavLink to="buy">Kaufen</NavLink>
      <NavLink to="sell">Verkaufen</NavLink>
    </nav>
  );
}
