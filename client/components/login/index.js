import React, { Component } from 'react';
import { InputText } from 'primereact/components/inputtext/InputText';
import { Button } from 'primereact/components/button/Button';

import { validField } from '../../utils/formValidator';

import splash from '../../assets/images/splash.png';
import './login.css';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                login: '',
                password: ''
            },
            errors: {
                login: '',
                password: ''
            }
        }
    }

    render() {
        return (
            <div className="login-wrapper">
                <img src={splash} alt="Splash image" draggable="false"></img>
                <div>LOGIN</div>
                <div>
                    <InputText id="login" onChange={event => this.setState({ values: { login: event.target.value } })} onBlur={event => this.setState({ errors: { login: !validField(event.target.value) } })} />
                </div>
                <div>PASSWORD</div>
                <div>
                    <InputText id="password" type="password" onChange={event => this.setState({ values: { password: event.target.value } })} onBlur={event => this.setState({ errors: { password: !validField(event.target.value) } })} />
                </div>
                <div>
                    <Button label="SUBMIT"></Button>
                </div>
            </div>
        )
    }
}