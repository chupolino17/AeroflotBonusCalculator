
import axios from 'axios';

const API_SERVER = "http://localhost/api"

export {API_SERVER}

export const apiClient = axios.create({
    baseURL: API_SERVER,
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFToken",
});
