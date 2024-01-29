import { Link } from "react-router-dom";
import { TMarketCard } from "../../types";

type MarketCardTextProps = {
  card: TMarketCard;
};

export default function MarketCardText({ card }: MarketCardTextProps) {
  return (
    <section className="market-card-text">
      <h2>{card.name}</h2>
      <p>{card.description}</p>
      <Link to={card.path}>Zum {card.name}</Link>
    </section>
  );
}
