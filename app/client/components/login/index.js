import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import axios from 'axios';
import { InputText } from 'primereact/components/inputtext/InputText';
import { Button } from 'primereact/components/button/Button';

import Growl from '../growl';
import { registerRedirectCreator, loginSuccessCreator } from '../../redux/actions/authenticationActions';
import { validField, validEmail } from '../../utils/formValidator';

import splash from '../../assets/images/splash.png';
import './login.css';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                email: '',
                password: ''
            },
            errors: {
                email: null,
                password: null
            },
            showGrowl: false
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.headToRegister = this.headToRegister.bind(this);
        this.onGrowlClick = this.onGrowlClick.bind(this);
    }

    handleLogin() {
        !Object.values(this.state.errors).includes(true)
            &&
            axios.post('/login', this.state.values)
                .then(response => {
                    this.setState({ showGrowl: false });
                    this.props.loginSuccessCreator(response.data.jwt, response.data.loggedUser);
                })
                .catch(error => {
                    this.setState({ showGrowl: true });
                    throw new Error(error);
                });
    }

    headToRegister() {
        this.props.registerRedirectCreator();
    }

    onGrowlClick() {
        this.setState({ showGrowl: !this.state.showGrowl });
    }

    render() {
        return (
            <div className='login-wrapper'>
                <Growl header='Fail!' body='Login failed' positive={false} showGrowl={this.state.showGrowl === true} onClick={this.onGrowlClick} />
                <img src={splash} alt='Splash image' draggable='false'></img>
                <div className='label-text'>EMAIL</div>
                <div>
                    <InputText
                        id='email'
                        className={this.state.errors.email === true && 'error-input'}
                        onChange={event => {
                            let values = this.state.values;
                            values.email = event.target.value;
                            this.setState({ values: values });
                            let errors = this.state.errors;
                            errors.email = !validEmail(event.target.value);
                            this.setState({ errors: errors });
                        }}
                        onBlur={event => {
                            let errors = this.state.errors;
                            errors.email = !validEmail(event.target.value);
                            this.setState({ errors: errors });
                        }}
                    />
                </div>
                {this.state.errors.email === true && <div className='error-message'>This field is wrong</div>}
                <div className='label-text'>PASSWORD</div>
                <div>
                    <InputText
                        id='password'
                        className={this.state.errors.password === true && 'error-input'}
                        type='password'
                        onChange={event => {
                            let values = this.state.values;
                            values.password = event.target.value;
                            this.setState({ values: values });
                            let errors = this.state.errors;
                            errors.password = !validField(event.target.value);
                            this.setState({ errors: errors });
                        }}
                        onBlur={event => {
                            let errors = this.state.errors;
                            errors.password = !validField(event.target.value);
                            this.setState({ errors: errors });
                        }}
                    />
                </div>
                {this.state.errors.password === true && <div className='error-message'>This field is wrong</div>}
                <div className='submit-button-wrapper'>
                    <Button label='SUBMIT' onClick={this.handleLogin} disabled={Object.values(this.state.errors).includes(true) || Object.values(this.state.errors).includes(null)}></Button>
                </div>
                <div className='label-text'>Want to register? Head right there!</div>
                <div>
                    <Button label='REGISTER' onClick={this.headToRegister}></Button>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ registerRedirectCreator, loginSuccessCreator }, dispatch);

export default connect(null, mapDispatchToProps)(LoginPage);