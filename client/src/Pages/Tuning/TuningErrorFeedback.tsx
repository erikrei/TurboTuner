import { useTuningContext } from "../../Contexts/TuningContext";

type TuningErrorFeedbackProps = {
  money: number | undefined;
  component_price: number;
};

export default function TuningErrorFeedback({
  money,
  component_price,
}: TuningErrorFeedbackProps) {
  const { selectedCar } = useTuningContext();
  
  return (
    <div className="tuning-error-feedback">
      {money !== undefined && component_price > money && <p>Zu wenig Geld.</p>}
      {selectedCar && selectedCar.tuning_information && (
        <p>Auto ist schon am tunen.</p>
      )}
    </div>
  );
}
