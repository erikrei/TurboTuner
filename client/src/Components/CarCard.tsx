import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { GENERAL_CARS } from "../data/GENERAL_CARS";
import { TGeneralCar } from "../types";

export default function CarCard({ carName }: { carName: string }) {
  const carInformation: TGeneralCar | undefined = GENERAL_CARS.find(
    (car) => car.name === carName
  );

  const navigate = useNavigate();

  function handleSelectFirstCar() {
    if (window.confirm(`Wollen Sie wirklich das Auto ${carName} auswählen?`)) {
      axios
        .post(
          "http://localhost:3000/car/addToUserFirstCar",
          {
            name: carName,
          },
          { withCredentials: true }
        )
        .then((response: AxiosResponse) => {
          if (response.status === 200) navigate("/dashboard");
        });
    }
  }

  return (
    <article className="car" onClick={handleSelectFirstCar}>
      {carInformation && (
        <img
          src={`${process.env.PUBLIC_URL}/assets/${carInformation.imgName}`}
          alt={carInformation.imgAlt}
        />
      )}
      <section className="car-description">
        <h2>{carName}</h2>
        {carInformation ? (
          <p>{carInformation.description}</p>
        ) : (
          <ReactLoading
            type="spin"
            className="loading-circle"
            color="#219ebc"
          />
        )}
      </section>
    </article>
  );
}
