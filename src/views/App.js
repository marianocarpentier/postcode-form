import React, {Component} from 'react';
import logo from '../assets/images/logo.svg';
import {FormGroup, FormControl, ControlLabel, HelpBlock, Button} from 'react-bootstrap';
import { validateInput } from 'actions/ProjectActions';
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
            stateMsg: '',
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
        return this.state.postcodeErr ? 'error' : null;
    }

    getValidationSuburb() {
        return this.state.suburbErr ? 'error' : null;
    }

    getValidationState() {
        return this.state.stateErr ? 'error' : null;
    }

    handleChangePostcode(e) {
        this.setState({ postcode: e.target.value });
    }
    handleChangeSuburb(e) {
        this.setState({ suburb: e.target.value });
    }
    handleChangeState(e) {
        this.setState({ state: e.target.value });
    }

    handleValidate(e) {

        const {postcode, suburb, state} = this.state;

        let postcodeState = {};
        if (postcode.length < 3) {
            postcodeState = {
                postcodeMsg: 'Eg: 2065',
                postcodeErr: true
            };
        } else {
            postcodeState = {
                postcodeMsg: '',
                postcodeErr: false
            };
        }

        let suburbState = {};
        if (suburb.length < 3) {
            suburbState = {
                suburbMsg: 'Eg: Crows Nest',
                suburbErr: true
            };
        } else {
            suburbState = {
                suburbMsg: '',
                suburbErr: false
            };
        }

        let stateState = {};
        if (state.length < 3) {
            stateState = {
                stateMsg: 'Eg: NSW',
                stateErr: true
            };
        } else {
            stateState = {
                stateMsg: '',
                stateErr: false
            };
        }

        this.props.dispatch(validateInput({}, this.props.dispatch));

        this.setState({
            ...postcodeState,
            ...suburbState,
            ...stateState
        });
    }

    render() {
        return (
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
                        <Button
                            bsStyle="primary"
                            onClick={this.handleValidate}>Validate</Button>
                    </form>
                </div>
            </div>
        );
    }
}


//-------------------------------------------------------------------------
//-------------------- Mapping store to Home's props ----------------------
//-------------------------------------------------------------------------

const mapStateToProps = (state, ownProps) => {

    const proj = state.Project;
    return {
        modalOpen: proj.modalOpen,
        projects: proj.projects
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);