import { NavLink } from "react-router-dom";

type MarketUsedDealerCarLinkProps = {
  car_id: string;
};

export default function MarketUsedDealerCarLink({
  car_id,
}: MarketUsedDealerCarLinkProps) {
  return <NavLink to={car_id}>Zur Ansicht</NavLink>;
}
