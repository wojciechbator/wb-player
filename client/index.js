import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import StudioPage from './studio';
import AudioStream from './audio';

export default class App extends Component {
    constructor(props) {
        super(props);
        if (module.hot) {
            module.hot.accept()
        }
        const audio = new AudioStream();
    }
    render() {
        return (
            <div>
                Welcome, react!
                <StudioPage />
            </div>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('root'));