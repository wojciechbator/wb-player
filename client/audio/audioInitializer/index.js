import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { initializeAudioContext } from './actions';

class AudioInitializer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioContext: ''
        }
    }

    componentDidMount() {
        this.setState({ audioContext: this.props.audioContext });
    }    

    render() {
        return (
            <div>A</div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        audioContext: store.audioInitializer.audioContext
    }
}

export default connect(mapStateToProps)(AudioInitializer);