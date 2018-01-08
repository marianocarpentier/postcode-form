import React from 'react';
import {expect} from 'chai';
import {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
var enzyme = require('enzyme');
import Form from './Form';

enzyme.configure({ adapter: new Adapter() })

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

        console.log(wrapper);
        expect(wrapper.find('FormGroup').length).to.equal(3);
    })
})