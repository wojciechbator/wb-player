import React, { Component } from 'react';
import { connect } from 'react-redux';

import Audio from '../audio';
import Diagnostics from '../diagnostics';
import Player from '../player';
import Recorder from '../recorder';

import './studio.css';

class StudioPage extends Component {
    render() {
        return (
            <div className='studio-container'>
                <div className='control-panel'>
                    <Player />
                    <Recorder initialAudio={this.props.audioContext} />
                </div>
                <div>
                    <Diagnostics />
                </div>
                <div>
                    <div>
                        <Audio />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        audioContext: state.audio.audioContext
    }
}

export default connect(mapStateToProps)(StudioPage);
