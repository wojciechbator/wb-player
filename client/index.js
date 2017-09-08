import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import StudioPage from './components/studio';
import Audio from './components/audio';
import Header from './components/header';
import Footer from './components/footer';
import store from './redux/store';
import { audioInitializer } from './utils/audioInitializer';

import './main.css';
import './assets/images/icon.png';
import 'font-awesome/css/font-awesome.min.css';
import 'primereact/resources/themes/trontastic/theme.css';
import 'primereact/resources/primereact.min.css';

const history = syncHistoryWithStore(browserHistory, store);

export default class App extends Component {
    constructor(props) {
        super(props);
        if (module.hot) {
            module.hot.accept();
        }
        audioInitializer();
    }
    
    render() {
        return (
            <div className='main-wrapper'>
                <Header />
                <div className='body-wrapper'>
                    <StudioPage />
                </div>
                <Footer />
            </div>
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