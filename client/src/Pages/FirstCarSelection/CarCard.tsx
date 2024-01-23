import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { GENERAL_CARS } from "../../data/GENERAL_CARS";

export default function CarCard({ carName }: { carName: string }) {
  const carInformation = GENERAL_CARS.find((car) => car.name === carName);

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
        .then(() => {
          navigate("/dashboard");
        });
    }
  }

  return carInformation ? (
    <article className="car" onClick={handleSelectFirstCar}>
      <img src={`${process.env.PUBLIC_URL}/assets/${carInformation.imgSrc}`} />
      <section className="car-description">
        <h2>{carName}</h2>
        <p>{carInformation.description}</p>
      </section>
    </article>
  ) : (
    <div className="first-car-loading-container">
      <ReactLoading type="spin" className="loading-circle" color="#219ebc" />
      <p>{carName} wird geladen...</p>
    </div>
  );
}
