import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import StudioPage from './studio';
import AudioStream from './audio';

export default class App extends Component {
    constructor(props) {
        super(props);
        const stream = new AudioStream();
    }
    render() {
        return (
            <StudioPage />
        );
    }
}
ReactDOM.render(<App />, document.getElementById('root'));