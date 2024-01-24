import Loading from "react-loading";

type BasicLoadingContainerProps = {
  loadingName: string;
  plural: boolean;
  color?: string;
};

export default function BasicLoadingContainer({
  loadingName,
  plural,
  color = "#219ebc",
}: BasicLoadingContainerProps) {
  return (
    <div className="basic-loading-container">
      <Loading type="spin" width={50} color={color} />
      <span>
        {loadingName} {plural ? "werden" : "wird"} geladen...
      </span>
    </div>
  );
}
