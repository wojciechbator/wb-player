import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import StudioPage from './studio';
import AcquireAudio from './audio';

export default class App extends Component {
    constructor(props) {
        super(props);
        if (module.hot) {
            module.hot.accept()
        }
    }
    render() {
        return (
            <div>
                Welcome, react!
                <StudioPage />
                <AcquireAudio />
            </div>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('root'));