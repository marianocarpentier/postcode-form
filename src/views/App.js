import React, {Component} from 'react';
import logo from '../assets/images/logo.svg';
import {FormGroup, FormControl, ControlLabel, HelpBlock, Button} from 'react-bootstrap';
import {validateInput} from 'actions/ProjectActions';
import {connect} from 'react-redux';
import './App.css';

class App extends Component {

    constructor(props) {

        super(props);

        this.state = {
            postcode: '',
            suburb: '',
            state: '',
            postcodeErr: false,
            suburbErr: false,
            stateErr: false,
            postcodeMsg: '',
            suburbMsg: '',
            stateMsg: ''
        }

        this.handleValidate = this.handleValidate.bind(this);
        this.handleChangePostcode = this.handleChangePostcode.bind(this);
        this.handleChangeSuburb = this.handleChangeSuburb.bind(this);
        this.handleChangeState = this.handleChangeState.bind(this);
        this.getValidationPostcode = this.getValidationPostcode.bind(this);
        this.getValidationSuburb = this.getValidationSuburb.bind(this);
        this.getValidationState = this.getValidationState.bind(this);
    }

    getValidationPostcode() {

        const {errorFields, successMessage} = this.props;
        return this.state.postcodeErr || errorFields.postcode ? 'error' : successMessage ? 'success' : null;
    }

    getValidationSuburb() {
        const {errorFields, successMessage} = this.props;
        return this.state.suburbErr || errorFields.suburb ? 'error' : successMessage ? 'success' : null;
    }

    getValidationState() {
        const {errorFields, successMessage} = this.props;
        return this.state.stateErr || errorFields.state ? 'error' : successMessage ? 'success' : null;
    }

    handleChangePostcode(e) {
        this.setState({postcode: e.target.value});
    }

    handleChangeSuburb(e) {
        this.setState({suburb: e.target.value});
    }

    handleChangeState(e) {
        this.setState({state: e.target.value});
    }

    /**
     * Validations for the data to post to the API.
     * The front end should sanitize as much as possible before hitting the backend.
     */
    handleValidate(e) {

        const {postcode, suburb, state} = this.state;

        let error = false;

        let postcodeState = {};
        if (postcode.length <= 0 || isNaN(postcode)) {
            postcodeState = {
                postcodeMsg: 'The postcode can not be empty and should be numeric. Eg: 2065',
                postcodeErr: true
            };
            error |= true;
        } else {
            postcodeState = {
                postcodeMsg: '',
                postcodeErr: false
            };
        }

        let suburbState = {};
        if (suburb.length <= 0) {
            suburbState = {
                suburbMsg: 'The suburb can not be empty. Eg: Crows Nest',
                suburbErr: true
            };
            error |= true;
        } else {
            suburbState = {
                suburbMsg: '',
                suburbErr: false
            };
        }

        let stateState = {};
        if (state.length <= 0) {
            stateState = {
                stateMsg: 'The state can not be empty. Eg: NSW',
                stateErr: true
            };
            error |= true;
        } else {
            stateState = {
                stateMsg: '',
                stateErr: false
            };
        }

        // If no error in the input, then dispatch the action to check on the API.
        if (!error) {

            this.props.dispatch(validateInput({suburb, state, postcode}, this.props.dispatch));

        }

        this.setState({
            ...postcodeState,
            ...suburbState,
            ...stateState
        });
    }

    render() {

        const {processing, errorMessages, successMessage} = this.props;

        return (
            <div>
                <div className="app">
                    <header className="header">
                        <img src={logo} className="logo" alt="logo"/>
                    </header>
                    <div className="form-container">
                        <h1>Address validator</h1>
                        <p>Please complete the form and click the button to validate the input.</p>
                        <form className="form">
                            <FormGroup
                                controlId="postcode"
                                validationState={this.getValidationPostcode()}>
                                <ControlLabel>Postcode</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.postcode}
                                    onChange={this.handleChangePostcode}
                                    placeholder="Enter the postcode"/>
                                <FormControl.Feedback/>
                                <HelpBlock>{this.state.postcodeMsg}</HelpBlock>
                            </FormGroup>
                            <FormGroup
                                controlId="suburb"
                                validationState={this.getValidationSuburb()}>
                                <ControlLabel>Suburb</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.suburb}
                                    onChange={this.handleChangeSuburb}
                                    placeholder="Enter the suburb"/>
                                <FormControl.Feedback/>
                                <HelpBlock>{this.state.suburbMsg}</HelpBlock>
                            </FormGroup>
                            <FormGroup
                                controlId="state"
                                validationState={this.getValidationState()}>
                                <ControlLabel>State</ControlLabel>
                                <FormControl
                                    type="text"
                                    value={this.state.state}
                                    onChange={this.handleChangeState}
                                    placeholder="Enter the state"/>
                                <FormControl.Feedback/>
                                <HelpBlock>{this.state.stateMsg}</HelpBlock>
                            </FormGroup>
                            {errorMessages.length ? (
                                errorMessages.map(em => (
                                    <FormGroup key={em}
                                        controlId="postcode"
                                        validationState="error">
                                        <HelpBlock>{em}</HelpBlock>
                                    </FormGroup>
                                ))
                            ) : ''}
                            {successMessage ? (
                                <FormGroup
                                    controlId="postcode"
                                    validationState="success">
                                    <HelpBlock>{successMessage}</HelpBlock>
                                </FormGroup>
                            ) : ''}
                            <Button
                                bsStyle="primary"
                                onClick={this.handleValidate}>Validate</Button>
                        </form>
                    </div>
                </div>
                {processing ?
                    (<div className="processing">
                        <div className="info">Validation in progress...</div>
                    </div>) : ''}
            </div>
        );
    }
}

//-------------------------------------------------------------------------
//-------------------- Mapping store to App's props ----------------------
//-------------------------------------------------------------------------

const mapStateToProps = (state, ownProps) => {

    const prj = state.Project;
    return {
        ...ownProps,
        processing: prj.address.processing,
        errorMessages: prj.address.errorMessages,
        errorFields: prj.address.errorFields,
        successMessage: prj.address.successMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);