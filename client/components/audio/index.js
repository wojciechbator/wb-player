import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GainNode from './gain';
import FilterNode from './filter';
import { removeNodeCreator } from '../../redux/actions/audioActions';
import audioChain from '../../utils/audioChain';
import './audio.css';

class AudioChain extends Component {
    constructor(props) {
        super(props);
    }

    removeNode(node) {
        this.props.removeNodeCreator(node);
    }
    
    render() {
        return (
            <div className='audio-chain'>
                {this.props.currentChain.map((element, i) => {
                element.type ?
                <FilterNode
                    key={i}
                    currentChain={this.props.currentChain}
                    currentNode={element}
                    inputStream={this.props.inputStream}
                    audioContext={this.props.audioContext}
                    removeNode={() => this.removeNode(element)} /> :
                <GainNode
                    key={i}
                    currentChain={this.props.currentChain}
                    currentNode={element}
                    inputStream={this.props.inputStream}
                    audioContext={this.props.audioContext}
                    removeNode={() => this.removeNode(element)} />
                })
                }
            </div>
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

const mapDispatchToProps = (dispatch) => bindActionCreators({removeNodeCreator}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AudioChain);