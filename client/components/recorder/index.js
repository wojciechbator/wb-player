import React, { Component } from 'react';
import {Button} from 'primereact/components/button/Button';
import { connect } from 'react-redux';

import { audioContextMerger } from '../../utils/audioContextMerger';
import WAVEInterface from './waveInterface';
import downloadBlob from './downloadBlob';
import './recorder.css';

const defaultProps = {
  loop: false,
  downloadable: true,
  className: '',
  style: {},
  filename: 'output.wav',
  playLabel: '🔊 Play',
  playingLabel: '❚❚ Playing',
  recordLabel: '● Record',
  recordingLabel: '● Recording',
  removeLabel: '✖ Remove',
  downloadLabel: '\ud83d\udcbe Save'
};

class Recorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      isPlaying: false,
      audioData: null
    };
    this.waveInterface = new WAVEInterface();
    this.startRecording = this.startRecording.bind(this);
    this.startPlayback = this.startPlayback.bind(this);
    this.stopPlayback = this.stopPlayback.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.onAudioEnded = this.onAudioEnded.bind(this);
    this.onDownloadClick = this.onDownloadClick.bind(this);
    this.onRemoveClick = this.onRemoveClick.bind(this);
    this.mergeAudio = this.mergeAudio.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.initialAudio &&
      nextProps.initialAudio !== this.props.initialAudio &&
      this.state.audioData &&
      nextProps.initialAudio !== this.state.audioData
    ) {
      this.waveInterface.reset();
      this.setState({
        audioData: nextProps.initialAudio,
        isPlaying: false,
        isRecording: false,
      });
    }
  }

  componentWillMount() { this.waveInterface.reset(); }
  componentWillUnmount() { this.waveInterface.reset(); }

  startRecording() {
    if (!this.state.isRecording) {
      this.waveInterface.startRecording()
        .then(() => {
          this.setState({ isRecording: true });
          if (this.props.onRecordStart) this.props.onRecordStart();
        })
        .catch((err) => { throw err; });
    }
  }

  stopRecording() {
    this.waveInterface.stopRecording();

    this.setState({
      isRecording: false,
      audioData: this.waveInterface.audioData
    });

    if (this.props.onChange) {
      this.props.onChange({
        duration: this.waveInterface.audioDuration,
        audioData: this.waveInterface.audioData
      });
    }
  }

  startPlayback() {
    if (!this.state.isPlaying) {
      this.waveInterface.startPlayback(this.props.loop, this.onAudioEnded).then(() => {
        this.setState({ isPlaying: true });
        if (this.props.onPlay) this.props.onPlay();
      });
    }
  }

  mergeAudio() {
    this.setState({ audioData: audioContextMerger(this.props.audioContext, this.props.playerContext)});
  }

  stopPlayback() {
    this.waveInterface.stopPlayback();
    this.setState({ isPlaying: false });
    if (this.props.onAbort) this.props.onAbort();
  }

  onAudioEnded() {
    this.setState({ isPlaying: false });
    if (this.props.onEnded) this.props.onEnded();
  };

  onRemoveClick() {
    this.waveInterface.reset();
    if (this.state.audioData && this.props.onChange) this.props.onChange({ duration: 0, audioData: null });
    this.setState({
      isPlaying: false,
      isRecording: false,
      audioData: null,
    });
  };

  onDownloadClick() {
    downloadBlob(this.state.audioData, this.props.filename);
  }

  onButtonClick(event) {
    if (this.state.audioData) {
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

  render() {
    return (
      <div className='recorder-module'>
        <div className='recorder-header'>Recorder</div>
          <div className='recorder-buttons'>
            {
              !this.state.isRecording ? 
                <Button className='recorder-button' label={defaultProps.recordLabel} onClick={this.startRecording} />
                :
                <Button className='recorder-button' label={defaultProps.recordingLabel} onClick={this.stopRecording} />
            }
            {
              !this.state.isPlaying && this.state.audioData ? 
                <Button className='recorder-button' label={defaultProps.playLabel} onClick={this.startPlayback} />
                :
                <Button className='recorder-button' label={defaultProps.playingLabel} onClick={this.stopPlayback} />
            }
            <Button className='recorder-button' label='&#x1f4be;' onClick={this.onDownloadClick} />
            <Button className='recorder-button' label={defaultProps.removeLabel} onClick={this.onRemoveClick} />
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    audioContext: state.audio.audioContext,
    playerContext: state.player.playerContext
  }
}

export default connect(mapStateToProps)(Recorder);
