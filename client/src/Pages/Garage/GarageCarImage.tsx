type GarageCarImageProps = {
  carName: string;
};

export default function GarageCarImage({ carName }: GarageCarImageProps) {
  return (
    <img
      src={`${process.env.PUBLIC_URL}/assets/${carName}.png`}
      alt={`${carName}`}
    />
  );
}
