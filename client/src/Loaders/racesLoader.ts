import axios from "axios";

export default function racesLoader() {
    return axios.get('http://localhost:3000/race');
}