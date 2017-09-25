import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Observable } from 'rxjs/Rx';
import Gain from './presentation';
import { gainValuesCreator, addNodeCreator } from '../../../redux/actions/audioActions';
import audioChain from '../../../utils/audioChain';
import 'rxjs/add/operator/throttleTime';

let gainNode = null;

class GainNode extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            volume: 50
        }
        
        this.onVolumeChange = this.onVolumeChange.bind(this);
    }

    componentDidMount() {
        gainNode = this.props.audioContext.createGain();
        gainNode.gain.value = this.state.volume / 100;
        this.props.gainValuesCreator(gainNode);
        this.props.addNodeCreator(gainNode);
        audioChain(this.props.currentChain[this.props.currentChain.indexOf(gainNode) - 1], gainNode, this.props.currentChain[this.props.currentChain.indexOf(gainNode) + 1], true, true, this.props.audioContext);
    }
    
    onVolumeChange(event) {
        this.setState({ volume: event.value });
        gainNode.gain.value = this.state.volume / 100;
        Observable
            .of(gainNode)
            .throttleTime(300)
            .subscribe(
                next => this.props.gainValuesCreator(next),
                error => console.log(error),
                complete => console.log(complete)
            );
    }
    
    render() {
        return (
            <div>
                <Gain type='GAIN' volume={this.state.volume} onVolumeChange={this.onVolumeChange} />
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        volume: store.audio.gainNode.volume
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({gainValuesCreator, addNodeCreator}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GainNode);