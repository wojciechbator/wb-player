import React, { Component } from 'react';
import AudioRecorder from './AudioRecorder.tsx';
// import { Recorder } from 'react-recorder-redux';
// import { 
//     recorderStart, 
//     recorderPause, 
//     recorderStop, 
//     recorderResume,
//     recorderGotStream } from 'react-recorder-redux/actions';
import {Button} from 'primereact/components/button/Button';

import './recorder.css';

export default class Recorder extends Component {
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
        // recorderStart();
        // console.log(recorderStart);
    }

    render() {
        return (
            <div className='recorder-module'>
                <div className='recorder-header'>Recorder</div>
                <div className='recorder-buttons'>
                    <Button className='recorder-button' label='&#9654;' onClick={this.startRecording} />
                    <Button className='recorder-button' label='| |' />
                    <Button className='recorder-button' label='&#9679;' />
                    <Button className='recorder-button' label='&#9655;' />
                    <Button className='recorder-button' label='&#x1f4be;' onClick={this.saveWavToDisk} />
                </div>
            </div>
        );
    }
}