export const PAGINATION_FILTERS = {
    PAGE_NUMBER: 'page',
    PAGE_SIZE: 'page_size',
    DISABLE_PAGINATION: 'all_pages',
};

export const ACTION_RESPONSES = {
    success: { ok: true, error: null, code: null, message: null },
    failure: { ok: false, error: null, code: null, message: null },
};

export const UTILS = {
    getPageNumber(url_string: string) {
        if (url_string) {
            let url = new URL(url_string);
            let page_number = url.searchParams.get(PAGINATION_FILTERS.PAGE_NUMBER);
            if (page_number) return parseInt(page_number);
            return 1;
        }
        return 1;
    },

    getSubdomain(url_string: string) {
        if (url_string) {
            let url = new URL(url_string);
            if (url.hostname.includes('www')) {
                return url.hostname.split('.')[1];
            }
            return url.hostname.split('.')[0];
        }
        return null;
    },

    injectSubdomain(subdomain: string, url: string) {
        const http_prefix = window.location.href.split(':')[0] + '://';
        const baseURL = new URL(url);
        if (baseURL.host.includes('www')) {
            subdomain = baseURL.host.replace('www', subdomain);
        } else {
            subdomain += '.' + baseURL.host;
        }
        return http_prefix + subdomain;
    },

    packFormData(data: Record<string, any>) {
        let formData = new FormData();
        for (const field in data) {
            formData.append(field, data[field]);
        }
        return formData;
    }
};
