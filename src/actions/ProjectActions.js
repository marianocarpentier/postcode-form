import {validateAddress} from 'util/api_calls/ProjectApiCalls'

const validateInput = (payload, dispatch) => {

    validateAddress(
        payload,
        result => {
            dispatch(postedAddress(result))
        },
        error => {
            dispatch(postError(error))
        }
    );

    return {
        type: "POST_VALIDATE_ADDRESS",
        payload
    }
}

const postedAddress = payload => {

    return {
        type: "POST_VALIDATE_ADDRESS_STARTED",
        payload
    }
}

const postError = error => {

    let payload = {}
    if (error.constructor.name === 'Error') {
        // In case 500 is received I don't want to show server's raw error.
        let errorMessage = 'There was an error, please contact support.';
        payload = {
            error: true,
            message: errorMessage
        };
    } else {
        payload = {...error, error: true};
    }
    return {
        type: "POST_VALIDATE_ADDRESS_ERROR",
        payload: payload
    }
}

export { validateInput }