import React, { Component } from 'react';
import { Recorder } from 'react-recorder-redux';
import { 
    recorderStart, 
    recorderPause, 
    recorderStop, 
    recorderResume,
    recorderGotStream } from 'react-recorder-redux/actions';
import {Button} from 'primereact/components/button/Button';

import './recorder.css';

export default class AudioRecorder extends Component {
    constructor(props) {
        super(props);
        this.saveWavToDisk = this.saveWavToDisk.bind(this);
        this.startRecording = this.startRecording.bind(this);
    }

    componentDidMount() {
    }

    saveWavToDisk() {

    }

    startRecording() {
        console.log("started...");
        recorderStart();
        console.log(recorderStart);
    }

    render() {
        return (
            <div className='recorder-module'>
                <Recorder />
                <div className='recorder-header'>Recorder</div>
                <div className='recorder-buttons'>
                    <Button className='recorder-button' label='START' onClick={this.startRecording} />
                    <Button className='recorder-button' label='PAUSE' onClick={recorderPause} />
                    <Button className='recorder-button' label='STOP'  onClick={recorderStop} />
                    <Button className='recorder-button' label='RESUME' onClick={recorderResume} />
                    <Button className='recorder-button' label='SAVE' onClick={this.saveWavToDisk} />
                </div>
            </div>
        );
    }
}