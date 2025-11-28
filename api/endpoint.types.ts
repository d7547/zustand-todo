export enum REQUEST_METHOD {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export const BaseTransformer = (data: Record<string, any>) => ({
    ...data,
    created_on: new Date(data?.created_on),
    edited_on: new Date(data?.edited_on),
});

// API Endpoint class to define request details
export class API_ENDPOINT {
    url: string;
    method: REQUEST_METHOD;
    response: any;
    transformer: Function | null;
    data_fields: Array<string>;

    constructor(init: Partial<API_ENDPOINT>) {
        this.url = init.url || '';
        this.method = init.method || REQUEST_METHOD.GET;
        this.response = init.response || null;
        this.transformer = init.transformer || null;
        this.data_fields = init.data_fields || [];
    }
}

export type API_SCHEMA = typeof API_ENDPOINT;
