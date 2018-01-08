import {
    validateAddressFromApi
} from 'util/helpers/ValidationHelpers';

const initialState = {
    address: {
        processing: false,
        errorMessages: '',
        postcode: '',
        suburb: '',
        state: '',
        errorFields: {
            suburb: false,
            state: false,
            postcode: false
        }
    }
};

export default (state = initialState, action) => {

    switch (action.type) {
        case 'POST_VALIDATE_ADDRESS_START':
            return {
                ...state,
                address: {
                    ...state.address,
                    processing: true,
                    suburbPostcode: '',
                    errorMessages: [],
                    errorFields: {
                        suburb: false,
                        state: false,
                        postcode: false
                    },
                    successMessage: '',
                    localities: [],
                    ...action.payload
                }
            }
        case 'POST_VALIDATE_ADDRESS_FINISHED':
            let locs = action.payload.localities ? action.payload.localities.locality : [];
            // The API returns a collection sometimes, and some other times it returns a single element.
            if (!(locs instanceof Array)) {
                locs = [locs];
            }
            let errors = validateAddressFromApi(locs, state.address.suburb,
                state.address.state, state.address.postcode);
            let successMessage = !errors.errorMessages.length ? 'The address is valid.' : '';
            return {
                ...state,
                address: {
                    ...state.address,
                    processing: false,
                    localities: locs,
                    ...errors,
                    successMessage
                }
            }
        case 'POST_VALIDATE_ADDRESS_ERROR':
            return {
                ...state,
                address: {
                    ...state.address,
                    processing: false,
                    errorMessages: ['Ops! The server returned an error. Please contact support.'],
                    successMessage: '',
                    localities: []
                }
            }
        default:
            return state
    }
}