import axios from "axios";

const api = axios.create({
    baseURL : "http://127.0.01:8000/api/",
})

export default api