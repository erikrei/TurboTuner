import axios from "axios";

export default function generalCarsLoader() {
    return axios.get('http://localhost:3000/car/general', { withCredentials: true })
}