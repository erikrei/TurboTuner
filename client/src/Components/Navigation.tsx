import { Link } from "react-router-dom";
import { FaWarehouse } from "react-icons/fa";

export default function Navigation() {
  return (
    <nav className="card-class">
      <h2>Navigation</h2>
      <div className="link-container">
        <FaWarehouse />
        <Link to="garage">Garage</Link>
      </div>
    </nav>
  );
}
