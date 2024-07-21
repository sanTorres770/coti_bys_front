import axios from "axios";

const customAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept' : 'application/json',
        'X-Requested-With' : 'XMLHttpRequest',
        'Content-Type' : 'application/json'
    }
})

export default customAxios