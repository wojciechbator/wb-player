import React, {Component} from 'react';
import {connect} from 'react-redux';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Dialog} from 'primereact/components/dialog/Dialog';

import WAVEInterface from './waveInterface';
import {downloadBlob} from './downloadBlob';
import {validField} from '../../utils/formValidator';
import './recorder.css';

const defaultProps = {
    filename: 'output.wav'
};

class Recorder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRecording: false,
            isPlaying: false,
            fileName: '',
            showSavePopup: false,
            textFieldError: null
        };
        this.waveInterface = new WAVEInterface(this.props.audioContext, this.props.analyserNode);
        this.startRecording = this.startRecording.bind(this);
        this.startPlayback = this.startPlayback.bind(this);
        this.stopPlayback = this.stopPlayback.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
        this.onAudioEnded = this.onAudioEnded.bind(this);
        this.onDownloadClick = this.onDownloadClick.bind(this);
        this.onRemoveClick = this.onRemoveClick.bind(this);
        this.onHideModal = this.onHideModal.bind(this);
        this.onShowModal = this.onShowModal.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.waveInterface.reset();
        this.setState({
            isPlaying: false,
            isRecording: false
        });
    }

    componentWillMount() {
        this.waveInterface.reset();
    }

    componentWillUnmount() {
        this.waveInterface.reset();
    }

    startRecording() {
        if (!this.state.isRecording) {
            this.waveInterface.startRecording()
                .then(() => {
                    this.setState({isRecording: true});
                    if (this.props.onRecordStart) this.props.onRecordStart();
                })
                .catch((err) => {
                    throw err;
                });
        }
    }

    stopRecording() {
        this.waveInterface.stopRecording();

        this.setState({
            isRecording: false
        });

        if (this.props.onChange) {
            this.props.onChange({
                duration: this.waveInterface.audioDuration
            });
        }
    }

    startPlayback() {
        if (!this.state.isPlaying) {
            this.waveInterface.startPlayback(this.props.loop, this.onAudioEnded).then(() => {
                this.setState({isPlaying: true});
                if (this.props.onPlay) this.props.onPlay();
            });
        }
    }

    stopPlayback() {
        this.waveInterface.stopPlayback();
        this.setState({isPlaying: false});
        if (this.props.onAbort) this.props.onAbort();
    }

    onAudioEnded() {
        this.setState({isPlaying: false});
        if (this.props.onEnded) this.props.onEnded();
    };

    onRemoveClick() {
        this.waveInterface.reset();
        if (this.props.audioContext && this.props.onChange) this.props.onChange({duration: 0});
        this.setState({
            isPlaying: false,
            isRecording: false
        });
    };

    onShowModal() {
        this.setState({showSavePopup: true});
    }

    onDownloadClick() {
        this.setState({showSavePopup: false});
        downloadBlob(this.waveInterface.audioData, this.state.fileName || defaultProps.filename);
    }

    onHideModal() {
        this.setState({showSavePopup: false, fileName: '', textFieldError: null});
        document.getElementById('fileName').value = '';
    }

    onButtonClick(event) {
        if (this.props.audioContext) {
            if (this.state.isPlaying) {
                this.stopPlayback();
                event.preventDefault();
            } else {
                this.startPlayback();
            }
        } else {
            if (this.state.isRecording) {
                this.stopRecording();
            } else {
                this.startRecording();
            }
        }
    };

    onFileNameTyping(event) {
        this.setState({fileName: event.target.value});
    }

    checkField(event) {
        this.setState({textFieldError: !validField(event.target.value)});
    }

    render() {
        return (
            <div className='recorder-module'>
                <Dialog header='Save record' visible={this.state.showSavePopup} modal={true} dismissableMask={true}
                        onHide={this.onHideModal}>
                    <div className='dialog-body'>
                        <InputText
                            id='fileName'
                            className={this.state.textFieldError === true && 'error-input'}
                            onChange={event => {
                                this.onFileNameTyping(event);
                                this.checkField(event);
                            }}
                        />
                        <button
                            className='ui-widget ui-state-default ui-corner-all control-button ui-button-text-only'
                            onClick={this.onDownloadClick}
                            disabled={this.state.textFieldError === null || this.state.textFieldError === true}>
                            <i className='fa fa-save'></i>
                        </button>
                        {this.state.textFieldError === true && <div className='error-message'>This field is wrong</div>}
                    </div>
                </Dialog>
                <div className='recorder-header'>Recorder</div>
                <div className='recorder-buttons'>
                    {
                        !this.state.isRecording ?
                            <button
                                className='ui-widget ui-state-default ui-corner-all control-button ui-button-text-only'
                                onClick={this.startRecording}><i className='fa fa-circle'></i></button>
                            :
                            <button
                                className='ui-widget ui-state-default ui-corner-all control-button ui-button-text-only'
                                onClick={this.stopRecording}><i className='fa fa-square'></i></button>
                    }
                    {
                        !this.state.isPlaying && this.props.audioContext ?
                            <button
                                className='ui-widget ui-state-default ui-corner-all control-button ui-button-text-only'
                                onClick={this.startPlayback}><i className='fa fa-play'></i></button>
                            :
                            <button
                                className='ui-widget ui-state-default ui-corner-all control-button ui-button-text-only'
                                onClick={this.stopPlayback}><i className='fa fa-pause'></i></button>
                    }
                    <button className='ui-widget ui-state-default ui-corner-all control-button ui-button-text-only'
                            onClick={this.onRemoveClick}><i className='fa fa-times'></i></button>
                    <button className='ui-widget ui-state-default ui-corner-all control-button ui-button-text-only'
                            onClick={this.onShowModal}><i className='fa fa-save'></i></button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        audioContext: state.audio.audioContext,
        analyserNode: state.audio.analyserNode
    };
};

export default connect(mapStateToProps)(Recorder);