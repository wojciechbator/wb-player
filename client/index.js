import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import StudioPage from './components/studio';
import Diagnostics from './components/diagnostics';
import Header from './components/header';
import Footer from './components/footer';
import store from './redux/store';
import AudioChain from './utils/AudioChain';
import { audioInitializer } from './utils/audioInitializer';

import 'font-awesome/css/font-awesome.min.css';
import 'primereact/resources/themes/trontastic/theme.css';
import 'primereact/resources/primereact.min.css';
import './main.css';
import './assets/images/icon.png';

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
        <div>
            <AudioChain />
            <Router history={history}>
                <Route path='/' component={App}>
                    <Route path='/diagnostics' component={Diagnostics} />
                </Route>
            </Router>
        </div>
    </Provider>, 
    document.getElementById('root'));