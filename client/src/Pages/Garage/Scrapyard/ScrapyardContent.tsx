import { useLoaderData } from "react-router-dom";
import { AxiosResponse } from "axios";

import { TScrapyardCar } from "../../../types";

import ScrapyardCarInformation from "./ScrapyardCarInformation";
import ScrapyardScrapButton from "./ScrapyardScrapButton";

export default function ScrapyardContent() {
  const loaderData = useLoaderData() as AxiosResponse;
  const scrapyardCar: TScrapyardCar = loaderData.data;

  return (
    <section className="tmp-bg">
      <ScrapyardCarInformation userCar={scrapyardCar.userCar} />
      <ScrapyardScrapButton
        scrapyardPrice={scrapyardCar.scrapyardPrice}
        carId={scrapyardCar.userCar._id}
      />
    </section>
  );
}
