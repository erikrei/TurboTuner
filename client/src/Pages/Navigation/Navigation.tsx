import { FaWarehouse, FaHome, FaStore, FaRoad } from "react-icons/fa";
import { BsBuildingsFill } from "react-icons/bs";
import { TbEngine } from "react-icons/tb";

import "../../styles/navigation.css";

import NavigationLink from "./NavigationLink";

export default function Navigation() {
  return (
    <nav>
      <NavigationLink
        icon={<FaHome />}
        linkName="Dashboard"
        path="/dashboard"
      />
      <NavigationLink icon={<TbEngine />} linkName="Tuning" path="tuning" />
      <NavigationLink icon={<FaRoad />} linkName="Rennen" path="race" />
      <NavigationLink icon={<FaWarehouse />} linkName="Garage" path="garage" />
      <NavigationLink icon={<FaStore />} linkName="Markt" path="market" />
      <NavigationLink
        icon={<BsBuildingsFill />}
        linkName="Gebäude"
        path="buildings"
      />
    </nav>
  );
}
