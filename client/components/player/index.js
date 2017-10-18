import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'primereact/components/button/Button';
import Search from '../search';
import { addPlayerCreator, mergedAudioCreator } from '../../redux/actions/playerActions';
import { audioContextMerger } from '../../utils/audioContextMerger';

import './player.css';

class Player extends Component {
    constructor(props) {
        super(props);
        this.defaultData = {
            source: null,
            startedAt: null,
            pausedAt: null,
            paused: true
        }
        this.state = {
            playbackAudioContext: new (window.AudioContext || window.webkitAudioContext)
        }
        this.playAudio = this.playAudio.bind(this);
        this.pauseAudio = this.pauseAudio.bind(this);
        this.loadAudio = this.loadAudio.bind(this);
        this.loadAudioUsingFileAPI = this.loadAudioUsingFileAPI.bind(this);
        this.decodeMp3FromBufferAndPlay = this.decodeMp3FromBufferAndPlay.bind(this);
        this.mergeAudio = this.mergeAudio.bind(this);
    }

    componentDidMount() {
        this.props.addPlayerCreator(this.state.playbackAudioContext);
    }

    playAudio(event) {
        event.stopPropagation();
        const fileInput = document.getElementById('audio_file');
        if (fileInput.files.length > 0 && ['audio/mpeg', 'audio/mp3'].includes(fileInput.files[0].type)) {
            this.loadAudioUsingFileAPI(fileInput.files[0], (mp3BytesArray) => {
                this.decodeMp3FromBufferAndPlay(mp3BytesArray);
            });
        } else {
            alert('Could not play, check if You loaded audio properly');
        }
    }

    pauseAudio() {
        this.defaultData.source.stop(0);
        this.defaultData.pausedAt = Date.now() - this.defaultData.startedAt;
        this.defaultData.paused = true;
    }

    mergeAudio(playerAudio) {
        this.props.mergedAudioCreator(audioContextMerger(this.props.audioContext, playerAudio));
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
        this.state.playbackAudioContext.decodeAudioData(mp3AudioBufferArray, (decodedAudioBuffer) => {
            this.defaultData.source = this.state.playbackAudioContext.createBufferSource();
            this.defaultData.source.buffer = decodedAudioBuffer;
            this.defaultData.source.connect(this.state.playbackAudioContext.destination);
            this.mergeAudio(this.state.playbackAudioContext);
            this.defaultData.paused = false;
            if (this.defaultData.pausedAt) {
                this.defaultData.startedAt = Date.now() - this.defaultData.pausedAt;
                this.defaultData.source.start(0, this.defaultData.pausedAt / 1000);
            }
            else {
                this.defaultData.startedAt = Date.now();
                this.defaultData.source.start(0);
            }
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

const mapStateToProps = (store) => {
    return {
        playbackAudioContext: store.player.playerContext,
        audioContext: store.audio.audioContext
    } 
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ addPlayerCreator, mergedAudioCreator }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Player);