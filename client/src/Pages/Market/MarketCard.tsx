import { TMarketCard } from "../../types";

import MarketCardText from "./MarketCardText";

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
      <MarketCardText card={card} />
    </article>
  );
}
