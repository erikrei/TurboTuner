type ErrorFeedbackProps = {
  showFeedback: boolean;
  errorText: string;
};

export default function ErrorFeedback({
  showFeedback,
  errorText,
}: ErrorFeedbackProps) {
  if (!showFeedback) return null;

  return <p className="error">{errorText}</p>;
}
