import React, { Component } from 'react';
import { InputText } from 'primereact/components/inputtext/InputText';
import { Button } from 'primereact/components/button/Button';

import splash from '../../assets/images/splash.png';
import './register.css';

export default class RegisterPage extends Component {
    render() {
        return (
            <div className="register-wrapper">
                <img src={splash} alt="Splash image" draggable="false"></img>
                <div>
                    <label for="login">Email</label>
                    <InputText id="login" />
                </div>
                <div>
                    <label for="password">Password</label>
                    <InputText id="password" type="password" />
                </div>
                <div>
                    <Button label="SUBMIT"></Button>
                </div>
            </div>
        )
    }
}