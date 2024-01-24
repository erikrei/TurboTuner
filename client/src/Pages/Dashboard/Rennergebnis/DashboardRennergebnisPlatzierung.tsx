type DashboardRennergebnisPlatzierungProps = {
  ranking: number;
};

export default function DashboardRennergebnisPlatzierung({
  ranking,
}: DashboardRennergebnisPlatzierungProps) {
  return (
    <div className="rennergebnis-ranking-container">
      <span className="rennergebnis-ranking-hashtag">#</span>
      <span className="rennergebnis-ranking">{ranking}</span>
    </div>
  );
}
