import axios from "axios";

export default function usedCarsLoader() {
    return axios.get('http://localhost:3000/useddealer', { withCredentials: true })
}