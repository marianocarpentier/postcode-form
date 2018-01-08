import RestApiClient from './RestApiClient';
import {API_TOKEN} from "../Constants";

const validateAddress = (addressPayload, successCallback, catchCallback) => {

    RestApiClient({
        relativeUrl: `/postcode/search.json?q=Sydney`,
        payload: addressPayload,
        successCallback,
        catchCallback
    });
}

export {validateAddress}