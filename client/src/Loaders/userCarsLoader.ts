import axios from "axios";

export default function userCarsLoader() {
    return axios.get('http://localhost:3000/car/allUser', { withCredentials: true })
}