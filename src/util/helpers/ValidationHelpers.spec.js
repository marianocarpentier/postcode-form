import React from 'react';
import {expect} from 'chai';
import {
    validateAddressFromApi
} from './ValidationHelpers';

describe('ValidationHelper', () => {

    let sampleData1 = [{
        "category": "Post Office Boxes",
        "id": 464,
        "location": "CROWS NEST",
        "postcode": 1585,
        "state": "NSW"
    }, {
        "category": "Delivery Area",
        "id": 634,
        "latitude": -33.82609,
        "location": "CROWS NEST",
        "longitude": 151.199192,
        "postcode": 2065,
        "state": "NSW"
    }, {
        "category": "Delivery Area",
        "id": 9486,
        "latitude": -27.262026,
        "location": "CROWS NEST",
        "longitude": 152.055416,
        "postcode": 4355,
        "state": "QLD"
    }, {
        "category": "Delivery Area",
        "id": 635,
        "location": "CROWS NEST DC",
        "postcode": 2065,
        "state": "NSW"
    }]
    it('should mark suburb and postcode with error', () => {
        let errors = validateAddressFromApi(sampleData1, 'crows nest', 'nsw', '2000');
        expect(errors.errorFields.postcode).to.equal(true);
        expect(errors.errorFields.state).to.equal(false);
        expect(errors.errorFields.suburb).to.equal(true);
    });
    it('should mark state, suburb and postcode with error', () => {
        let errors = validateAddressFromApi(sampleData1, 'crows nest', 'queensland', '2000');
        expect(errors.errorFields.postcode).to.equal(true);
        expect(errors.errorFields.state).to.equal(true);
        expect(errors.errorFields.suburb).to.equal(true);
    });
    it('should output the error for the suburb and postcode not matching', () => {
        let errors = validateAddressFromApi(sampleData1, 'crows nest', 'nsw', '2000');
        expect(errors.errorMessages[0]).to.equal('The postcode 2000 does not match the suburb crows nest');
    });
    it('should output the error for the state and postcode not matching', () => {
        let errors = validateAddressFromApi(sampleData1, 'crows nest', 'queensland', '2065');
        expect(errors.errorMessages[0]).to.equal('The suburb crows nest does not exist in the state queensland');
    });
})