import axios from "axios";

export default function usedSingleCarLoader(car_id: string) {
    return axios.get(`http://localhost:3000/useddealer/${car_id}`, { withCredentials: true })
}