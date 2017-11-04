import React, { Component } from 'react';

export default class RegisterPage extends Component {
    render() {
        return (
            <div className="register-wrapper">
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