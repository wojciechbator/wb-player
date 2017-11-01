import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

import MainPage from './components/mainPage';
import Diagnostics from './components/diagnostics';
import LoginPage from './components/login';
import RegisterPage from './components/register';
import configureStore from './redux/store';
import AudioChain from './utils/AudioChain';
import { audioInitializer } from './utils/audioInitializer';
import SplashScreen from './components/splash';

import 'font-awesome/css/font-awesome.min.css';
import 'primereact/resources/themes/trontastic/theme.css';
import 'primereact/resources/primereact.min.css';
import './main.css';
import './assets/images/icon.png';

const reduxRouting = routerMiddleware(browserHistory);
const store = configureStore(window.__INITIAL_STATE_, reduxRouting);
const history = syncHistoryWithStore(browserHistory, store);

export default class App extends Component {
    constructor(props) {
        super(props);
        if (module.hot) {
            module.hot.accept();
        }
        audioInitializer(store);
    }

    render() {
        return (
            <div>
               {this.props.children}
            </div>
        );
    }
}

if (window) {
    ReactDOM.render(<Provider store={store}>
            <div>
                <AudioChain />
                <Router history={history}>
                    <Route path='/' component={App}>
                        <IndexRoute component={MainPage} />
                        <Route path='/diagnostics' component={Diagnostics} />
                        <Route path='/login' component={LoginPage} />
                        <Route path='/register' component={RegisterPage} />
                    </Route>
                </Router>
            </div>
        </Provider>, 
        document.getElementById('root'));
    } 
    else {
       ReactDOM.render(<SplashScreen />, document.getElementById('root'));
    }

