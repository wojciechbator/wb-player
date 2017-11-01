import React, { Component } from 'react';
import { InputText } from 'primereact/components/inputtext/InputText';
import { Button } from 'primereact/components/button/Button';

import splash from '../../assets/images/splash.png';

export default class LoginPage extends Component {
    render() {
        return (
            <div className="login-wrapper">
                <img src={splash} alt="Splash image"></img>
                <div>
                    <label for="login">Email</label>
                    <InputText id="login" />
                </div>
                <div>
                    <label for="password">Password</label>
                    <InputText id="password" type="password" />
                </div>
                <div>
                    <Button>OK</Button>
                </div>
            </div>
        )
    }
}