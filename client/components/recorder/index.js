import React, { Component } from 'react';
import { Recorder } from 'react-recorder-redux';
import {Button} from 'primereact/components/button/Button';

export default class AudioRecorder extends Component {
    render() {
        return (
            <div>
                <Recorder />
                <Button />
            </div>
        );
    }
}