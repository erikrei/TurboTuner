type BuildingsSingleImageProps = {
  imgName: string;
};

export default function BuildingsSingleImage({
  imgName,
}: BuildingsSingleImageProps) {
  return (
    <img
      src={`${process.env.PUBLIC_URL}/assets/buildings/${imgName}.jpg`}
      alt={`Bild von ${imgName}`}
    />
  );
}
