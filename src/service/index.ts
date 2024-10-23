import axios from "axios";

const { VITE_BACKEND_URL } = import.meta.env;

// axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;

export const baseUrl = axios.create({
    baseURL: VITE_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("twitchAccessToken")}`,
    },
})