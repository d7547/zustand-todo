import { API_ENDPOINT, REQUEST_METHOD } from "@/api/endpoint.types";

export const API_ENDPOINTS = {
    login: new API_ENDPOINT({
        url: "/en/auth/login/",
        method: REQUEST_METHOD.POST,
        response: null,
        transformer:null
    }),

    
};
