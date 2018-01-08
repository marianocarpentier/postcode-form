import {API_URL} from '../Constants';

const defaultCatchCallback = err => {
    console.error(err)
}

const generateUrl = relativeUrl => {
    return `${API_URL}${relativeUrl}`;
}

const buildHeaders = () => {
    const headers = new Headers({
        'Content-Type': 'application/json'
    });
    return headers;
}

const generateRequest = (url, type, headers, payload) => {

    if (type === 'GET') {
        return new Request(url, {
            method: type,
            mode: 'cors'
        });
    } else {
        return new Request(url, {
            method: type,
            mode: 'cors',
            body: JSON.stringify(payload)
        });
    }
}

export {
    defaultCatchCallback,
    generateUrl,
    buildHeaders,
    generateRequest
};