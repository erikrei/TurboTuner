type CarImageProps = {
  carName: string;
};

export default function GarageCarImage({ carName }: CarImageProps) {
  return (
    <img
      src={`${process.env.PUBLIC_URL}/assets/${carName}.png`}
      alt={`${carName}`}
    />
  );
}
