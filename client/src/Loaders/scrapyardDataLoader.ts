import axios from "axios";

export default function scrapyardDataLoader(car_id: string) {
    return axios.get(`http://localhost:3000/scrapyard/price/${car_id}`, { withCredentials: true })
}