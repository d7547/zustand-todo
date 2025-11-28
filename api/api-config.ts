// Use this import if you want to use "env.js" file
import { env } from 'next-runtime-env';
export const API_URL = env('NEXT_PUBLIC_BASE_URL') ?? '';

/**
 * The options used to configure the API.
 */
export interface ApiConfig {
    /**
     * The URL of the api.
     */
    url: string;

    /**
     * Milliseconds before we timeout the request.
     */
    timeout: number;
    /**
     * auth token storage key
     */
    token_key: string;

    // refresh token key
    refresh_token_key: string;
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
    url: API_URL,
    timeout: 100000,
    token_key: 'access',
    refresh_token_key: 'refresh'
};
