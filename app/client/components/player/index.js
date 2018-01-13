import React, {Component} from 'react';
import {connect} from 'react-redux';

import Growl from '../growl';

import './player.css';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            source: null,
            startedAt: null,
            pausedAt: null,
            paused: true,
            showGrowl: false,
            fileInput: null,
            nextAudioFileLoaded: false
        };
        this.blockPlayButton = this.blockPlayButton.bind(this);
        this.playAudio = this.playAudio.bind(this);
        this.pauseAudio = this.pauseAudio.bind(this);
        this.loadAudio = this.loadAudio.bind(this);
        this.loadAudioUsingFileAPI = this.loadAudioUsingFileAPI.bind(this);
        this.decodeMp3FromBufferAndPlay = this.decodeMp3FromBufferAndPlay.bind(this);
        this.onGrowlClick = this.onGrowlClick.bind(this);
    }

    playAudio(event) {
        if (this.state.source) {
            this.state.source.connect(this.props.currentChain[this.props.currentChain.length - 1]);
            this.setState({paused: false});
        }
        else {
            event.stopPropagation();
            if (this.state.fileInput && this.state.fileInput.files.length > 0 && ['audio/mpeg', 'audio/mp3'].includes(this.state.fileInput.files[0].type)) {
                this.loadAudioUsingFileAPI(this.state.fileInput.files[0], mp3BytesArray => this.decodeMp3FromBufferAndPlay(mp3BytesArray));
                this.setState({paused: false});
            }
            else this.setState({showGrowl: true});
        }
    }

    pauseAudio() {
        this.state.source.disconnect(this.props.currentChain[this.props.currentChain.length - 1]);
        this.setState({pausedAt: this.props.audioContext.currentTime - this.state.startedAt});
        this.setState({paused: true});
    }

    loadAudio() {
        const fileInput = document.getElementById('audio_file');
        this.setState({fileInput: fileInput});
        if (this.state.source && !this.state.paused) {
            this.state.source.disconnect(this.props.currentChain[this.props.currentChain.length - 1]);
            this.setState({source: null, nextAudioFileLoaded: true});
        }
    }

    blockPlayButton() {
        return this.state.source && this.state.paused === false;
    }

    loadAudioUsingFileAPI(selectedFile, callback) {
        const reader = new FileReader();
        reader.onload = event => {
            const mp3AudioBufferArray = reader.result;
            callback(mp3AudioBufferArray);
        };
        reader.readAsArrayBuffer(selectedFile);
    }

    decodeMp3FromBufferAndPlay(mp3AudioBufferArray) {
        this.props.audioContext.decodeAudioData(mp3AudioBufferArray, decodedAudioBuffer => {
            this.setState({source: this.props.audioContext.createBufferSource()});
            let newSource = this.state.source;
            newSource.buffer = decodedAudioBuffer;
            newSource.loop = true;
            this.setState({source: newSource});
            this.state.source.connect(this.props.currentChain[this.props.currentChain.length - 1]);
            this.setState({paused: false});
            if (this.state.pausedAt && !this.state.nextAudioFileLoaded) {
                this.setState({startedAt: this.props.audioContext.currentTime - this.state.pausedAt});
                this.state.source.start(0, this.props.pausedAt / 1000);
            }
            else {
                this.setState({startedAt: this.props.audioContext.currentTime});
                this.state.source.start(0);
            }
        });
    }

    onGrowlClick() {
        this.setState({showGrowl: !this.state.showGrowl});
    }

    render() {
        return (
            <div>
                <Growl header='Problem' body='Could not play, check source' positive={false}
                       showGrowl={this.state.showGrowl === true} onClick={this.onGrowlClick}/>
                <div className='player-module'>
                    <div className='player-header'>Playback</div>
                    <div className='player-control-buttons'>
                        <label htmlFor='audio_file' className='fa fa-upload file-upload'>
                            <input id='audio_file' className='ui-button' type='file' onChange={this.loadAudio}
                                   accept='audio/*'/>
                        </label>
                        <button
                            className='class="ui-button ui-widget ui-state-default ui-corner-all control-button ui-button-text-only'
                            onClick={this.playAudio} disabled={this.blockPlayButton()}><i className="fa fa-play"></i>
                        </button>
                        <button
                            className='class="ui-button ui-widget ui-state-default ui-corner-all control-button ui-button-text-only'
                            onClick={this.pauseAudio} disabled={!this.blockPlayButton()}><i className="fa fa-pause"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        audioContext: state.audio.audioContext,
        currentChain: state.audio.currentChain
    }
};

export default connect(mapStateToProps)(Player);