import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import StudioPage from './studio';
import Audio from './audio';

export default class App extends Component {
    constructor(props) {
        super(props);
        if (module.hot) {
            module.hot.accept()
        }

        this.state = {
            record: false,
            blobObject: null,
            isRecording: false
        }
        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
    }

    startRecording() {
        this.setState({
            record: true,
            isRecording: true
        })
    }

    stopRecording() {
        this.setState({
            record: false,
            isRecording: false
        })
    }

    onStart() {
        console.log("onStart method invoke");
    }

    onStop(blobObject) {
        this.setState({
            blobURL: blobObject.blobURL
        });
    }

    render() {
        return (
            <div>
                <StudioPage />
                <Audio />
            </div>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('root'));