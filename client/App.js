import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AudioInitializer from './utils/AudioInitializer';import AudioChain from './utils/AudioChain';
import { loginRedirectCreator } from './redux/actions/authenticationActions';

class App extends Component {
    constructor(props) {
        super(props);  
        if (module.hot) {
            module.hot.accept();
        }
    }

    componentDidMount() {
        !localStorage.getItem('token') && this.props.loginRedirectCreator();
    }

    render() {
        return (
            <div>
                {this.props.isAuthenticated === true &&
                    <div>
                        <AudioInitializer />
                        <AudioChain />
                    </div>}
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        isAuthenticated: store.authentication.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ loginRedirectCreator }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);