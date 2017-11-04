import React, { Component } from 'react';
import { InputText } from 'primereact/components/inputtext/InputText';
import { Button } from 'primereact/components/button/Button';

import { 
    validField, 
    validEmail, 
    validPassword, 
    validConfirmPassword 
} from '../../utils/formValidator';

import splash from '../../assets/images/splash.png';
import './register.css';

export default class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                login: '',
                email: '',
                fullName: '',
                password: ''
            },
            errors: {
                login: false,
                email: false,
                fullName: false,
                password: false,
                confirmPassword: false
            }
        }
        this.checkLogin = this.checkLogin.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.checkFullName = this.checkFullName.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.checkConfirmPassword = this.checkConfirmPassword.bind(this);
    }

    checkLogin(event) {
        this.setState({ errors: { login: !validField(event.target.value) } });
    }

    checkEmail(event) {
        this.setState({ errors: { email: !validField(event.target.value) } });
    }

    checkFullName(event) {
        this.setState({ errors: { fullName: !validField(event.target.value) } });
    }

    checkPassword(event) {
        this.setState({ errors: { password: !validField(event.target.value) } });
    }

    checkConfirmPassword(event) {
        this.setState({ errors: { confirmPassword: !validField(event.target.value) } });
    }

    render() {
        return (
            <div className="register-wrapper">
                <img src={splash} alt="Splash image" draggable="false"></img>
                <div>LOGIN</div>
                <div>
                    <InputText id="login" onChange={(event) => this.setState({ values: { login: event.target.value } })} onBlur={this.checkLogin} />
                </div>
                <div>EMAIL</div>
                <div>
                    <InputText id="login" onChange={(event) => this.setState({ values: { email: event.target.value } })} onBlur={this.checkEmail} />
                </div>
                <div>FULL NAME</div>
                <div>
                    <InputText id="login" onChange={(event) => this.setState({ values: { fullName: event.target.value } })} onBlur={this.checkFullName} />
                </div>
                <div>PASSWORD</div>
                <div>
                    <InputText id="password" type="password" onChange={(event) => this.setState({ values: { password: event.target.value } })} onBlur={this.checkPassword} />
                </div>
                <div>CONFIRM PASSWORD</div>
                <div>
                    <InputText id="password" type="password" onChange={(event) => this.setState({ values: { confirmPassword: event.target.value } })} onBlur={this.checkConfirmPassword} />
                </div>
                <div>
                    <Button label="SUBMIT"></Button>
                </div>
            </div>
        )
    }
}