import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

import App from './App';
import MainPage from './components/mainPage';
import Diagnostics from './components/diagnostics';
import LoginPage from './components/login';
import RegisterPage from './components/register';
import SplashScreen from './components/splash';
import configureStore from './redux/store';

import 'font-awesome/css/font-awesome.min.css';
import 'primereact/resources/themes/trontastic/theme.css';
import 'primereact/resources/primereact.min.css';
import './main.css';
import './assets/images/icon.png';

const routing = routerMiddleware(browserHistory);
const store = configureStore(window.__INITIAL_STATE_, routing);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(<Provider store={store}>
    <div>
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

