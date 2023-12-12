import axios from "axios";

export default function userInfoLoader() {
    return axios.get('http://localhost:3000/userInfo', {
        withCredentials: true
    })
}