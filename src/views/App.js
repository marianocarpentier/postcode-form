import React, {Component} from 'react';
import logo from '../assets/images/logo.svg';
import {validateInput} from '../actions/ProjectActions';
import {connect} from 'react-redux';
import Form from './components/Form';
import './App.css';

class App extends Component {

    constructor(props) {

        super(props);
        this.state = {}

        this.handleInputValidation = this.handleInputValidation.bind(this);
    }

    handleInputValidation(suburb, state, postcode) {

        this.props.dispatch(validateInput({suburb, state, postcode},
            this.props.dispatch));
    }

    render() {

        const {processing, errorMessages, errorFields, successMessage} = this.props;

        return (
            <div>
                <div className="app">
                    <header className="header">
                        <img src={logo} className="logo" alt="logo"/>
                    </header>
                    <Form errorMessages={errorMessages} errorFields={errorFields}
                          successMessage={successMessage} validateInput={(suburb, state, postcode) =>
                        this.handleInputValidation(suburb, state, postcode)}/>
                </div>
                {processing ?
                    (<div className="processing">
                        <div className="info">Australia Post API Validation in progress...</div>
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