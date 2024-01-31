import { TError } from "../../../../types";

import ErrorFeedback from "../../../../Components/ErrorFeedback";

type MarketUsedDealerBidButtonProps = {
  handleBidClick: () => void;
  errorObj: TError;
};

export default function MarketUsedDealerBidButton({
  handleBidClick,
  errorObj,
}: MarketUsedDealerBidButtonProps) {
  return (
    <>
      <button onClick={handleBidClick}>Gebot abgeben</button>
      <ErrorFeedback
        showFeedback={errorObj.showError}
        errorText={errorObj.errorMessage}
      />
    </>
  );
}
