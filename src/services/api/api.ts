import axios from "axios";
import Cookies from 'js-cookie';

const baseURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL,
    timeout: 10_000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        // const isAuthenticated = Cookies.get('isAuthenticated');

        // if (isAuthenticated) {
        //     config.headers.Authorization = `Bearer ${isAuthenticated}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            Cookies.remove('isAuthenticated');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
