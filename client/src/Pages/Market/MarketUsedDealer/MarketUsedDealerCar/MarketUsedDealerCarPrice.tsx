type MarketUsedDealerCarPriceProps = {
  price: number;
};

export default function MarketUsedDealerCarPrice({
  price,
}: MarketUsedDealerCarPriceProps) {
  return <p className="car-price">Preis {price} €</p>;
}
