import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import StudioPage from './studio';
import Audio from './audio';
import { reducers } from './reducers';

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    // Only for web, electron doesn't work with this
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));
const history = syncHistoryWithStore(browserHistory, store);

export default class App extends Component {
    constructor(props) {
        super(props);
        if (module.hot) {
            module.hot.accept();
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