import { NavLink } from "react-router-dom";
import { PiArrowUpRightBold } from "react-icons/pi";

type DashboardLinkProps = {
  linkURL: string;
  linkText: string;
};

export default function DashboardLink({
  linkURL,
  linkText,
}: DashboardLinkProps) {
  return (
    <NavLink to={linkURL} className="dashboard-link">
      <span>{linkText}</span>
      <PiArrowUpRightBold />
    </NavLink>
  );
}
