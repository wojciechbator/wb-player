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
    }

    handleLogout() {
        this.props.logoutCreator();
        this.props.socket.emit('disconnect');
    }

    render() {
        return (
            <div className='header'>
                <div className="logo-center">
                    <img className='logo' src={logo} alt='logo' />
                    <div className='header-text'>Hello {sessionStorage.getItem('loggedUser')}!</div>
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
        loggedUser: store.authentication.loggedUser,
        socket: store.socket.socket
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ logoutCreator }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);