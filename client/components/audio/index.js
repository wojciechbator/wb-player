import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Observable } from 'rxjs/Rx';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import GainNode from './gain';
import audioChain from '../../utils/audioChain';
import { observeAudioChain } from '../../services/audioChain/AudioChainService';
import './audio.css';

class AudioChain extends Component {
    constructor(props) {
        super(props);
        this.observeChain = this.observeChain.bind(this);
    }

    componentDidMount() {
        this.observeChain();
    }

    render() {
        return (
            <div className='audio-chain'>
                <GainNode 
                    currentChain={this.props.currentChain} 
                    inputStream={this.props.inputStream}
                    audioContext={this.props.audioContext} />
                <GainNode 
                    currentChain={this.props.currentChain} 
                    inputStream={this.props.inputStream}
                    audioContext={this.props.audioContext} />
            </div>
        );
    }

    observeChain() {
        observeAudioChain(this.props.audioChain)
        .subscribe(
            next => console.log(next)
        );
    }
}

const mapStateToProps = (store) => {
    return {
        audioContext: store.audio.audioContext,
        inputStream: store.audio.inputStream,
        currentChain: store.audio.currentChain
    }
}

export default DragDropContext(HTML5Backend)(connect(mapStateToProps)(AudioChain));