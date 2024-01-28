import { NavLink } from "react-router-dom";

type GarageScrapyardButtonProps = {
  car_id: string;
};

export default function GarageScrapyardButton({
  car_id,
}: GarageScrapyardButtonProps) {
  return <NavLink to={`scrapyard/${car_id}`}>Auto verschrotten</NavLink>;
}
