import React from 'react';
import {expect} from 'chai';
import {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

var enzyme = require('enzyme');
import Form from './Form';

enzyme.configure({adapter: new Adapter()})

describe('Component Form', () => {
    it('should have a 3 FormGroup(s) if no error is rendered', () => {

        let wrapper = shallow(<Form errorMessages={[]}
                                    errorFields={{
                                        suburb: false,
                                        state: false,
                                        postcode: false
                                    }}
                                    successMessage={''}
                                    validateInput={() => console.log("Validate input")}/>);

        expect(wrapper.find('FormGroup').length).to.equal(3);
    });
    it('should have a 4 FormGroup(s) if success is rendered', () => {

        let wrapper = shallow(<Form errorMessages={[]}
                                    errorFields={{
                                        suburb: false,
                                        state: false,
                                        postcode: false
                                    }}
                                    successMessage={'The validation is ok'}
                                    validateInput={() => console.log("Validate input")}/>);

        expect(wrapper.find('FormGroup').length).to.equal(4);
    });
    it('should have a 5 FormGroup(s) if error is rendered with 2 error messages', () => {

        let wrapper = shallow(<Form errorMessages={['error 1', 'error 2']}
                                    errorFields={{
                                        suburb: false,
                                        state: false,
                                        postcode: false
                                    }}
                                    successMessage={''}
                                    validateInput={() => console.log("Validate input")}/>);

        expect(wrapper.find('FormGroup').length).to.equal(5);
    });
    it('should display errors on postcode if the postcode validation fails', () => {

        let wrapper = shallow(<Form errorMessages={['error 1']}
                                    errorFields={{
                                        suburb: false,
                                        state: false,
                                        postcode: true
                                    }}
                                    successMessage={''}
                                    validateInput={() => console.log("Validate input")}/>);

        let validationPostcode = wrapper.instance().getValidationPostcode()
        expect(validationPostcode).to.equal('error');
    });
    it('should not display errors on suburb if the postcode validation fails', () => {

        let wrapper = shallow(<Form errorMessages={['error 1']}
                                    errorFields={{
                                        suburb: false,
                                        state: false,
                                        postcode: true
                                    }}
                                    successMessage={''}
                                    validateInput={() => console.log("Validate input")}/>);

        let validationSuburb = wrapper.instance().getValidationSuburb()
        expect(validationSuburb).to.equal(null);
    });
})