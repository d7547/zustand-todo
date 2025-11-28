import { ApiConfig, DEFAULT_API_CONFIG } from './api-config';
import { API_ENDPOINT, REQUEST_METHOD } from './endpoint.types';
import { ApiResponse, ApisauceInstance, create } from 'apisauce';
import { useAuthStore } from '../stores/auth/auth.store';

export class Api {
    apisauce: any;
    config: any;

    constructor(config: any) {
        this.config = config;
        this.apisauce = create({
            baseURL: this.config.url,
            timeout: this.config.timeout,
            headers: {
                Accept: 'application/json',
            },
            withCredentials: true,
        });
    }

    setup() {
        this.apisauce = create({
            baseURL: this.config.url,
            timeout: this.config.timeout,
            headers: {
                Accept: 'application/json',
            },
        });
    }

    async call(endpoint: API_ENDPOINT, payload: any = {}, ids: Record<string, any> = {}, headers: any = {}) {
        // Access the token from Zustand store
        const token = useAuthStore.getState().token;

        if (token) {
            this.apisauce.setHeader('Authorization', 'Bearer ' + token);
        } else {
            this.apisauce.setHeader('Authorization', '');
        }

        headers = { ...this.apisauce.headers, ...headers };

        endpoint = new API_ENDPOINT(endpoint);

        if (Object.keys(ids).length > 0) {
            for (let id in ids) {
                endpoint.url = endpoint.url.replace('{' + id + '}', ids[id]);
            }
        }

        if (endpoint.url.match('/[{*}]')) {
            console.error('Unfilled parameters in the URL');
        }

        if (endpoint.url[endpoint.url.length - 1] !== '/' && !endpoint.url.includes('?')) {
            endpoint.url += '/';
        }

        let response;
        switch (endpoint.method) {
            case REQUEST_METHOD.GET:
                response = await this.apisauce.get(endpoint.url, payload, { headers });
                break;
            case REQUEST_METHOD.POST:
                response = await this.apisauce.post(endpoint.url, payload, { headers });
                break;
            case REQUEST_METHOD.PATCH:
                response = await this.apisauce.patch(endpoint.url, payload, { headers });
                break;
            case REQUEST_METHOD.DELETE:
                response = await this.apisauce.delete(endpoint.url, payload, { headers });
                break;
            default:
                throw new Error('Unknown request method');
        }

        return response;
    }
}

export const apiInstance = new Api({
    url: 'https://api.backend.kynnik.com',
    timeout: 10000, 
});

