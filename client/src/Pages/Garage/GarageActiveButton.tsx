type GarageActiveButtonProps = {
  handleActiveCarClick: () => void;
};

export default function GarageActiveButton({
  handleActiveCarClick,
}: GarageActiveButtonProps) {
  return <button onClick={handleActiveCarClick}>auswählen</button>;
}
