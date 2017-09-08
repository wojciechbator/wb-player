import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GainNode from './gain';

import './audio.css';

export default class AudioChain extends Component {
    render() {
        return (
            <div className='audio-chain'>
                <GainNode />
                <GainNode />
                <GainNode />
            </div>
        );
    }
}
