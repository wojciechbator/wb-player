import React, { Component } from 'react';
import { Fieldset } from 'primereact/components/fieldset/Fieldset';
import { Slider } from 'primereact/components/slider/Slider';

export default class NodePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'gain',
            volume: 50
        }
    }
    
    onVolumeChange(newVolume) {
        this.setState({ volume: newVolume });
    }
    
    render() {
        return (
            <Fieldset legend={this.state.type}>
            <Slider orientation='vertical' animate value={this.state.volume} onChange={this.onVolumeChange} />
            </Fieldset>
        );
    }
}