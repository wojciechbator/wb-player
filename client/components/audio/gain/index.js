import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NodePanel from '../../common/nodePanel';
import { storeGainNodeValues } from '../../../redux/actions/audioActions';

class GainNode extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            volume: 0.5
        }

        this.onVolumeChange = this.onVolumeChange.bind(this);
    }

    componentDidMount() {
        const gainNode = this.props.audio.audioContext.createGain();
        this.props.dispatch(storeGainNodeValues(gainNode));
    }

    onVolumeChange(newVolume) {
        this.setState({ volume: newVolume });
    }
    
    render() {
        return (
            <div>
                <NodePanel type="gain" volume={this.state.volume} onVolumeChange={this.onVolumeChange} />
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    volume: store.audio.gainNode.volume
}

export default connect(mapStateToProps)(GainNode);