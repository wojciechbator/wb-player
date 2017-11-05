import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GainNode from './gain';
import FilterNode from './filter';
import './audio.css';

class Audio extends Component {
    render() {
        return (
            <div className='audio-chain'>
                {this.props.currentChain.map((element, i) => {
                    if (element.type) {
                        <FilterNode
                            key={i}
                            index={i}
                            node={element} />
                    } else {
                        <GainNode
                            key={i}
                            index={i}
                            node={element} />
                    }})
                }
            </div>
        );
    }
    render() {
        return (
        <div className='audio-chain'>
            {this.props.currentChain.map((element, i) => <GainNode key={i} index={i} node={element} />)}
        </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        currentChain: store.audio.currentChain
    }
}

export default connect(mapStateToProps)(Audio);