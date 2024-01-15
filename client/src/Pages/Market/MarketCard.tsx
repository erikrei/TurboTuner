import { Link } from "react-router-dom";
import { TMarketCard } from "../../types";

type MarketCardProps = {
  card: TMarketCard;
};

export default function MarketCard({ card }: MarketCardProps) {
  return (
    <article
      className="market-card-container"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/${card.imgSrc})`,
      }}
    >
      <section className="market-card-text">
        <h2>{card.name}</h2>
        <p>{card.description}</p>
        {card.name === 'Gebrauchtwagenhändler' ? <span>Noch nicht implementiert</span> : <Link to={card.path}>Zum {card.name}</Link>}
      </section>
    </article>
  );
}
