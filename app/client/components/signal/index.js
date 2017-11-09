import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Signal extends Component {
    render() {
        return (
            <div>
                <canvas />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        audioContext: state.audio.audioContext
    }
}

export default connect(mapStateToProps)(Signal);