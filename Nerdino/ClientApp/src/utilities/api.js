export const api = {
    get,
    post,
    put,
    delete: deleted
};

async function apiCall(url, options) {
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
    };

    options.headers = { ...options.headers, ...headers };

    return fetch(`api/${url}`, options)
        .then(response => {
            if (response.status >= 200 && response.status <= 299) {
                const contentType = response.headers.get('content-type');

                if (contentType && contentType.indexOf('application/json') !== -1) {
                    return response.json();
                } else {
                    return response.text();
                }
            } else {
                throw new Error(`${response.status} ${response.statusText}`);
            }
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            return Promise.reject(error);
        });
}

async function get(resource) {
    const options = { method: 'GET' };

    return await apiCall(resource, options);
}

async function post(resource, data) {
    const options = { method: 'POST', body: JSON.stringify(data) };

    return await apiCall(resource, options);
}

async function put(resource, data) {
    const options = { method: 'PUT', body: JSON.stringify(data) };

    return await apiCall(resource, options);
}

async function deleted(resource) {
    const options = { method: 'DELETE' };

    return await apiCall(resource, options);
}
