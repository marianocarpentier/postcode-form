import RestApiClient from './RestApiClient';

const validateAddress = (queryString, successCallback, catchCallback) => {

    RestApiClient({
        relativeUrl: `/prod/postcode-search?${queryString}`,
        successCallback,
        catchCallback
    });
}

export {validateAddress}