import React, { Component } from 'react';
import { InputText } from 'primereact/components/inputtext/InputText';
import { Button } from 'primereact/components/button/Button';

import splash from '../../assets/images/splash.png';
import './login.css';

export default class LoginPage extends Component {
    render() {
        return (
            <div className="login-wrapper">
                <img src={splash} alt="Splash image" draggable="false"></img>
                <div>LOGIN</div>
                <div>
                    <InputText id="login" />
                </div>
                <div>PASSWORD</div>
                <div>
                    <InputText id="password" type="password" />
                </div>
                <div>
                    <Button label="SUBMIT"></Button>
                </div>
            </div>
        )
    }
}