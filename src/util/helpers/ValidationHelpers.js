const validateAddressFromApi = (localities, suburb, state, postcode) => {

    let errorMessages = [];
    let errorFields = {
        'suburb': false,
        'state': false,
        'postcode': false,
    };

    if (localities) {

        //Checking that the entered postcode matches the suburb
        let suburbsFromThePostcode = localities.filter(l => l.postcode === Number.parseInt(postcode, 10));
        if (!suburbsFromThePostcode.length) {
            errorMessages.push(`The postcode ${postcode} does not match the suburb ${suburb}`);
            errorFields.postcode = true;
            errorFields.suburb = true;
        }

        // The following code is just a workaround for NSW, since the user could just write 'New South Wales'
        // and that should not throw error. Ideally, the API would consider this case or the frontend should
        // allow the user to select only over the existing states in the API,
        // but for this exercise we need to fix this manually.
        let stateCurated = state.toLowerCase();
        if (state.toLowerCase() === 'new south wales') {
            stateCurated = 'nsw';
        }

        //Checking that the entered suburb matches the state
        let suburbs = localities.filter(l => l.location.toLowerCase() === suburb.toLowerCase() &&
            l.state.toLowerCase() === stateCurated);
        if (!suburbs.length) {
            errorMessages.push(`The suburb ${suburb} does not exist in the state ${state}`);
            errorFields.state = true;
            errorFields.suburb = true;
        }
    }

    return {
        errorMessages,
        errorFields
    };
}

export {
    validateAddressFromApi
};