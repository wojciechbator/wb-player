import React, { Component } from 'react';
import Search from '../search';
import {Button} from 'primereact/components/button/Button';

import './player.css';

export default class Player extends Component {
    constructor(props) {
        super(props);
        this.playAudio = this.playAudio.bind(this);
        this.pauseAudio = this.pauseAudio.bind(this);
        this.loadAudio = this.loadAudio.bind(this);
    }

    playAudio() {
        const audioPlayer = document.getElementById('audio_player');
        audioPlayer.play();
    }
    
    pauseAudio() {
        const audioPlayer = document.getElementById('audio_player');
        audioPlayer.pause();
    }

    loadAudio() {
        const audioFile = document.getElementById('audio_file');
        const audioPlayer = document.getElementById('audio_player');
        const file = URL.createObjectURL(audioFile.files[0]);        
        audioPlayer.src = file;
    }

    loadAudioFromAutocomplete() {

    }

    render() {
        return (
            <div className="player-module">
                <Search />
                <div className="upload-container">
                    <div className="player-header">or upload file</div>
                    <label htmlFor="audio_file" className="file-upload">
                        UPLOAD AUDIO
                        <input id="audio_file" className="ui-button" type="file" onChange={this.loadAudio} accept="audio/*" />
                    </label>
                    <Button label="PLAY" onClick={this.playAudio} />
                    <Button label="STOP" onClick={this.pauseAudio} />
                </div>
                <audio id="audio_player" />
            </div>
        );
    }
}