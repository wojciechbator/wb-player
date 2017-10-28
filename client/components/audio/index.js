import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GainNode from './gain';
import FilterNode from './filter';
import { removeNodeCreator } from '../../redux/actions/audioActions';
import './audio.css';

class Audio extends Component {
    constructor(props) {
        super(props);
        this.removeNode = this.removeNode.bind(this);
    }

    removeNode(node) {
        this.props.removeNodeCreator(node);
    }
    
    render() {
        console.log(this.props.currentChain);
        return (
            <div className='audio-chain'>
                {this.props.currentChain.map((element, i) => {
                    element.type ?
                    <FilterNode
                        key={i}
                        type={element.type}
                        removeNode={this.removeNode} 
                        /> :
                    <GainNode
                        key={i}
                        removeNode={this.removeNode} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Audio);