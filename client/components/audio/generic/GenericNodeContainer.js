import React, { Component } from 'react';
import GenericAudioNode from '.';

export default class GenericNodeContainer extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            node: this.props.node,
            soundValue: this.props.soundValue
        } 
        this.onVolumeChange = this.onVolumeChange.bind(this);
    }

    componentDidMount() {
        audioChain(this.props.currentChain[this.props.currentChain.indexOf(this.state.node) - 1], 
                    this.state.node, 
                    this.props.currentChain[this.props.currentChain.indexOf(this.state.node) + 1], 
                    true, 
                    true, 
                    this.props.audioContext);
    
    }

    onVolumeChange(event) {
        this.setState({ soundValue: event.value });
    }

    render() {
        return (
            <div>
                <GenericAudioNode type={this.props.type} volume={this.state.soundValue} onVolumeChange={this.onVolumeChange} />
            </div>
        )
    }
}