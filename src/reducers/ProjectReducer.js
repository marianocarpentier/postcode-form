const initialState = {
    error: false,
    posting: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'POST_VALIDATE_ADDRESS':
            return {
                ...state,
                posting: false,
                error: false
            }
        case 'POST_VALIDATE_ADDRESS_STARTED':
            return {
                ...state,
                posting: false,
                error: false
            }
        case 'POST_VALIDATE_ADDRESS_ERROR':
            return {
                ...state,
                posting: false,
                error: false
            }
        default:
            return state
    }
}