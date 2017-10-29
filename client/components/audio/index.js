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
                    element.type ?
                    <FilterNode
                        key={i}
                        node={element} /> :
                    <GainNode
                        key={i}
                        node={element} />
                    })
                }
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