import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loginRedirectCreator } from './redux/actions/authenticationActions';

class App extends Component {
    constructor(props) {
        super(props);
        !localStorage.getItem('token') && this.props.loginRedirectCreator();
        if (module.hot) {
            module.hot.accept();
        }
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ loginRedirectCreator }, dispatch);

export default connect(null, mapDispatchToProps)(App);