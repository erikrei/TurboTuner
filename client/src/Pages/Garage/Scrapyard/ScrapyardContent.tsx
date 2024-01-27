import { useLoaderData } from "react-router-dom";
import { AxiosResponse } from "axios";

import { TScrapyardCarInformation } from "../../../types";

import ScrapyardCarInformation from "./ScrapyardCarInformation";
import ScrapyardScrapButton from "./ScrapyardScrapButton";

export default function ScrapyardContent() {
  const loaderData = useLoaderData() as AxiosResponse;
  const scrapyardData: TScrapyardCarInformation = loaderData.data;

  return (
    <section className="tmp-bg">
      <ScrapyardCarInformation userCar={scrapyardData.scrapyardCar} />
      <ScrapyardScrapButton
        scrapyardPrice={scrapyardData.scrapyardPrice}
        carId={scrapyardData.scrapyardCar._id}
      />
    </section>
  );
}
