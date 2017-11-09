import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loginRedirectCreator } from './redux/actions/authenticationActions';
import './app.css';

class App extends Component {
    constructor(props) {
        super(props);  
        if (module.hot) {
            module.hot.accept();
        }
    }

    componentDidMount() {
        this.props.isAuthenticated === false && this.props.loginRedirectCreator();
    }

    render() {
        return (
            <div className='wrapper'>
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authentication.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ loginRedirectCreator }, dispatch);

export default connect(null, mapDispatchToProps)(App);