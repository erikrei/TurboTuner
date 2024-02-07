import { BUILDINGS_DESCRIPTIONS } from "../../../data/BUILDINGS_DESCRIPTIONS";

type BuildingsSingleTextProps = {
  name: string;
  level: number;
};

export default function BuildingsSingleText({
  name,
  level,
}: BuildingsSingleTextProps) {
  const description = BUILDINGS_DESCRIPTIONS.find(
    (building) => building.buildingName === name
  )?.buildingDescription;

  return (
    <div className="building-text">
      <h3 className="building-header">
        {name} [{level}]
      </h3>
      <p className="building-description">{description}</p>
    </div>
  );
}
