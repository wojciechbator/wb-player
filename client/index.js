import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Route } from 'react-router-dom';
import thunk from 'redux-thunk';
import { syncHistoryWithStore, routerMiddleware, routerReducer } from 'react-router-redux';
// import browserHistory from 'history/createBrowserHistory';

import StudioPage from './studio';
import Audio from './audio';

const store = createStore(
    combineReducers({
        routing: routerReducer
    }),
    applyMiddleware(thunk, routerMiddleware)
);
const history = syncHistoryWithStore(browserHistory, store);

export default class App extends Component {
    constructor(props) {
        super(props);
        if (module.hot) {
            module.hot.accept()
        }
    }
    
    render() {
        return (
            <StudioPage />
        );
    }
}
ReactDOM.render(<Provider store={store}>
    <Router history={history}>
        <Route path='/' component={App} />
        <Route path='/audio' component={Audio} />
    </Router>
    </Provider>, 
    document.getElementById('root'));