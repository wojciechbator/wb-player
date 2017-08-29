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
                <AcquireAudio record={this.state.record} audioBitsPerSecond={128000} onStop={this.onStop} onStart={this.onStart} />
                <audio ref='audioSource' controls src={this.state.blobObject}></audio>
                <br />
                <br />
                <button disabled={this.state.isRecording} onClick={this.startRecording}>Nagrywaj</button>
                <button disabled={!this.state.isRecording} onClick={this.stopRecording}>Koniec</button>
            </div>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('root'));