import axios from "axios"

export default function authLoader() {
    return axios.get('http://localhost:3000/auth', {
        withCredentials: true
    })
}