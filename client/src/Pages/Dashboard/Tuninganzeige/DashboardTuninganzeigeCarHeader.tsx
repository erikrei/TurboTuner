type DashboardTuninganzeigeCarHeader = {
  carName: string;
};

export default function DashboardTuninganzeigeCarHeader({
  carName,
}: DashboardTuninganzeigeCarHeader) {
  return (
    <div className="tuninganzeige-car-header">
      <img
        src={`${process.env.PUBLIC_URL}/assets/small_cars/${carName}.png`}
        alt={`${carName} in kleiner Darstellung`}
      />
      <span>{carName}</span>
    </div>
  );
}
