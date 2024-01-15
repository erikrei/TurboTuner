import { MARKET_CARDS } from "../../data/MARKET_CARDS";

import MarketCard from "./MarketCard";

import "../../styles/market.css";

export default function Market() {
  return (
    <div className="market-container content-container">
      <h1 className="content-headline">Markt</h1>
      <section className="market-cards-container">
        {MARKET_CARDS.map((card) => (
          <MarketCard key={card.name} card={card} />
        ))}
      </section>
    </div>
  );
}
