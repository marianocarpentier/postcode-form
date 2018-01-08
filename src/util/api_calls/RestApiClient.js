import {
    defaultCatchCallback,
    buildHeaders,
    generateUrl,
    generateRequest,
} from '../helpers/MiddlewareHelpers';

const RestApiClient = ({
                           relativeUrl,
                           type = 'GET',
                           successCallback = res => res,
                           catchCallback = defaultCatchCallback,
                           payload = {},
                       }) => {

    // -------------------------------------------------------------------------------
    // ---------------------- Build headers, url and request -------------------------
    // -------------------------------------------------------------------------------

    const headers = buildHeaders();
    const url = generateUrl(relativeUrl);

    console.log(url,headers);
    const request = generateRequest(url, type, headers, payload);

    // -------------------------------------------------------------------------------
    // ------------------------------- Make API call ---------------------------------
    // -------------------------------------------------------------------------------

    fetch(request).then(response => {
        // Token expired.
        if (response.status === 401) {
            console.error("Token is invalid. response: ", response)
            return;
        }
        // API logic error. Pass error to "catch" callback.
        else if (!response.ok && response.status !== 400) {
            throw Error(response);
        }
        // API success. Pass to next "then" callback.
        return response.json();
    })
        .then(response => {
            // On 401's, the response is undefined.
            if (response === undefined) {
                return;
            }
            // There is a validation error with your payload.
            else if (response.error_code) {
                console.log("Validation error: ", response);
                catchCallback(response);
            }
            // Success callback.
            else {
                successCallback(response);
            }
        })
        .catch((e) => {
            // Handle an API logic error.
            catchCallback(e);
        })
};


export default RestApiClient;