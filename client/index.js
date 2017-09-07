import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import StudioPage from './components/studio';
import Audio from './components/audio';
import store from './redux/store';
import { audioInitializer } from './utils/audioInitializer';

import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';

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