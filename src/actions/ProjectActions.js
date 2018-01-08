import {validateAddress} from '../util/api_calls/ProjectApiCalls'

const validateInput = (parameters, dispatch) => {

    let apiPars = '';
    apiPars += `q=${parameters.suburb}`
    apiPars += parameters.state ? `&state=${parameters.state}` : '';

    validateAddress(
        apiPars,
        payload => {
            dispatch(postedAddress(payload))
        },
        error => {
            dispatch(postError(error))
        }
    );

    return {
        type: 'POST_VALIDATE_ADDRESS_START',
        payload: parameters
    }
}

const postedAddress = payload => {

    return {
        type: 'POST_VALIDATE_ADDRESS_FINISHED',
        payload: payload
    }
}

const postError = error => {

    console.error("error",error);
    let payload = {}
    if (error.constructor.name === 'Error') {
        // In case 500 is received I don't want to show server's raw error.
        payload = {
            errorMessages: ['There was an error, please contact support.']
        };
    } else {
        payload = {...error};
    }
    return {
        type: "POST_VALIDATE_ADDRESS_ERROR",
        payload: payload
    }
}

export {validateInput}