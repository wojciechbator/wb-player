import React, { Component } from 'react';
import Search from '../search';
import {Button} from 'primereact/components/button/Button';

import './player.css';

export default class Player extends Component {
    constructor(props) {
        super(props);
        this.source = null;
        this.playbackAudioContext = null;
        this.playAudio = this.playAudio.bind(this);
        this.pauseAudio = this.pauseAudio.bind(this);
        this.loadAudio = this.loadAudio.bind(this);
        this.loadAudioUsingFileAPI = this.loadAudioUsingFileAPI.bind(this);
        this.decodeMp3FromBufferAndPlay = this.decodeMp3FromBufferAndPlay.bind(this);
    }

    playAudio(event) {
        event.stopPropagation();
        const fileInput = document.getElementById('audio_file');
        if (fileInput.files.length > 0 && ['audio/mpeg', 'audio/mp3'].includes(fileInput.files[0].type)) {
            this.loadAudioUsingFileAPI(fileInput.files[0], (mp3BytesArray) => {
                this.decodeMp3FromBufferAndPlay(mp3BytesArray);
            });
        } else {
            alert("FUCK!");
        }
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

    loadAudioUsingFileAPI(selectedFile, callback) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const mp3AudioBufferArray = reader.result;
            callback(mp3AudioBufferArray);
        }
        reader.readAsArrayBuffer(selectedFile);
    }

    decodeMp3FromBufferAndPlay(mp3AudioBufferArray) {
        this.playbackAudioContext = new (window.AudioContext || window.webkitAudioContext);
        this.playbackAudioContext.decodeAudioData(mp3AudioBufferArray, (decodedAudioBuffer) => {
            if (this.source) {
                this.source.disconnect(this.playbackAudioContext.destination);
                this.source = null;
            }

            this.source = this.playbackAudioContext.createBufferSource();
            this.source.buffer = decodedAudioBuffer;
            this.source.connect(this.playbackAudioContext.destination);
            this.source.start(0);
        });
    } 

    render() {
        return (
            <div>
                <div className='player-module'>
                    <Search />
                    <div className='upload-container'>
                        <div className='player-header'>or upload file</div>
                        <label htmlFor='audio_file' className='file-upload'>
                            UPLOAD AUDIO
                            <input id='audio_file' className='ui-button' type='file' onChange={this.loadAudio} accept='audio/*' />
                        </label>
                    </div>
                    <audio id='audio_player' />
                </div>
                <div className='player-control-buttons'>
                    <Button className='control-button' label='&#9654; PLAY' onClick={this.playAudio} />
                    <Button className='control-button' label='| | PAUSE' onClick={this.pauseAudio} />
                </div>
            </div>
        );
    }
}