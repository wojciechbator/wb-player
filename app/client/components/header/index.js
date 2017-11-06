import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'primereact/components/button/Button';

import { logoutCreator } from '../../redux/actions/authenticationActions';

import './header.css';
import logo from '../../assets/images/logo.png';

class Header extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.enterDiagnostics = this.enterDiagnostics.bind(this);
    }

    handleLogout() {
        this.props.logoutCreator();
    }

    enterDiagnostics() {

    }

    render() {
        return (
            <div className='header'>
                <div>
                    <Button label='Diagnostics' onClick={this.enterDiagnostics}></Button>
                </div>
                <div className="logo-center">
                    <img className='logo' src={logo} alt='logo' />
                    <div className='header-text'>Play and record Your music</div>
                </div>
                <div>
                    <Button label='Log out' onClick={this.handleLogout}></Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        loggedUser: store.authentication.loggedUser
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ logoutCreator }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);