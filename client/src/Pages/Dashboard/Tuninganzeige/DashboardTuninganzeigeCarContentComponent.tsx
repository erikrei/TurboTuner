import { HiArrowLongRight } from "react-icons/hi2";

type DashboardTuninganzeigeCarContentComponentProps = {
  component_name: string;
  new_component_level: number;
};

export default function DashboardTuninganzeigeCarContentComponent({
  component_name,
  new_component_level,
}: DashboardTuninganzeigeCarContentComponentProps) {
  return (
    <div className="tuninganzeige-car-content-component">
      <span>{component_name}</span>
      <HiArrowLongRight />
      <span>{new_component_level}</span>
    </div>
  );
}
