import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addNodeToAvailablesCreator, addCompressorCreator, addMasterCreator, storeAnalyserNodeCreator } from '../redux/actions/audioActions';

class AudioNodes extends Component {
    constructor(props) {
        super(props);
        this.createGain = this.createGain.bind(this);
        this.createBass = this.createBass.bind(this);
        this.createMiddle = this.createMiddle.bind(this);
        this.createTreble = this.createTreble.bind(this);
        this.createWaveShaper = this.createWaveShaper.bind(this);
        this.makeDistortionCurve = this.makeDistortionCurve.bind(this);
        this.createDynamicsCompressor = this.createDynamicsCompressor.bind(this);
        this.createConvolver = this.createConvolver.bind(this);
        this.createDelay = this.createDelay.bind(this);
        this.createAnalyser = this.createAnalyser.bind(this);
        this.addNodesToAvailables = this.addNodesToAvailables.bind(this);
        this.prepareAudioChain = this.prepareAudioChain.bind(this);
        this.addNodesToAvailables();
        this.prepareAudioChain();
    }

    createGain() {
        let gain = this.props.audioContext.createGain();
        gain.gain.value = 0.5;
        return gain;
    }

    createBass() {
        let bass = this.props.audioContext.createBiquadFilter();
        bass.type = 'lowpass';
        bass.frequency.value = 62;
        bass.Q.value = 1;
        bass.gain.value = 50;
        return bass;
    }

    createMiddle() {
        let middle = this.props.audioContext.createBiquadFilter();
        middle.type = 'bandpass';
        middle.frequency.value = 700;
        middle.Q.value = 1;
        middle.gain.value = 50;
        return middle;
    }

    createTreble() {
        let treble = this.props.audioContext.createBiquadFilter();
        treble.type = 'highpass';
        treble.frequency.value = 1400;
        treble.Q.value = 1;
        treble.gain.value = 50;
        return treble;
    }

    createWaveShaper() {
        let distortion = this.props.audioContext.createWaveShaper();
        distortion.curve = this.makeDistortionCurve(100);
        distortion.oversample = '4x';
        return distortion;
    }

    makeDistortionCurve(amount) {
        const count = typeof amount === 'number' ? amount : 50;
        const samplesNumber = 44100;
        const degree = Math.PI / 180;
        let curve = new Float32Array(samplesNumber);
        let distorter;
        for (let i = 0; i < samplesNumber; ++i) {
            distorter = i * 2 / samplesNumber - 1;
            curve[i] = (3 + count) * distorter * 20 * degree / ( Math.PI + count * Math.abs(distorter) );
        }
        return curve;
    }

    createDynamicsCompressor() {
        let compressor = this.props.audioContext.createDynamicsCompressor();
        compressor.threshold.value = -10;
        compressor.knee.value = 40;
        compressor.ratio.value = 12;
        compressor.attack.value = 0;
        compressor.release.value = 0.25;
        return compressor;
    }

    createConvolver() {
        let convolver = this.props.audioContext.createConvolver();
        let convolverGain = this.props.audioContext.createGain();
        let buffer = this.props.audioContext.createBuffer(2, this.props.audioContext.sampleRate / 2, this.props.audioContext.sampleRate);
        convolver.buffer = buffer;
        convolver.loop = true;
        convolver.normalize = true;
        convolverGain.gain.value = 0;
        convolverGain.connect(convolver);
        return convolverGain;
    }

    createDelay() {
        let delay = this.props.audioContext.createDelay(5.0);
        return delay;
    }

    createAnalyser() {
        let analyser = this.props.audioContext.createAnalyser();
        analyser.fftSize = 256;
        return analyser;
    }

    addNodesToAvailables() {
        const gain = this.createGain();
        this.props.addNodeToAvailablesCreator(gain);
        const bass = this.createBass();
        this.props.addNodeToAvailablesCreator(bass);
        const middle = this.createMiddle();
        this.props.addNodeToAvailablesCreator(middle);
        const treble = this.createTreble();
        this.props.addNodeToAvailablesCreator(treble);
        const distortion = this.createWaveShaper();
        this.props.addNodeToAvailablesCreator(distortion);
        const convolver = this.createConvolver()
        this.props.addNodeToAvailablesCreator(convolver);
        const delay = this.createDelay(100.0);
        this.props.addNodeToAvailablesCreator(delay);
        const analyser = this.createAnalyser();
        this.props.storeAnalyserNodeCreator(analyser);
    }

    prepareAudioChain() {
        this.props.addMasterCreator(this.createGain());
        this.props.addCompressorCreator(this.createDynamicsCompressor());
    }

    render() {
        return null;
    }
}

const mapStateToProps = (store) => {
    return {
        currentChain: store.audio.currentChain
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ addNodeToAvailablesCreator, addCompressorCreator, addMasterCreator, storeAnalyserNodeCreator }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AudioNodes);