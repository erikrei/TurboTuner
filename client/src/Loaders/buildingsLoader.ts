import axios from "axios";

export default function buildingsLoader() {
    return axios.get('http://localhost:3000/buildings', { withCredentials: true })
}