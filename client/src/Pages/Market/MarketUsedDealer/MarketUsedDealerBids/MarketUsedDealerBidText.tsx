type MarketUsedDealerBidTextProps = {
  bidValue: string;
  setBidValue: React.Dispatch<React.SetStateAction<string>>;
};

export default function MarketUsedDealerBidText({
  bidValue,
  setBidValue,
}: MarketUsedDealerBidTextProps) {
  return (
    <>
      <label htmlFor="bid">Bieten</label>
      <input
        type="number"
        name="bid"
        id="bid"
        value={bidValue}
        onChange={(event) => setBidValue(event.target.value)}
      />
    </>
  );
}
