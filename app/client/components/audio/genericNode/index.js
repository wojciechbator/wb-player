import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { nodeValueCreator, removeNodeCreator } from '../../../redux/actions/audioActions';
import { Fieldset } from 'primereact/components/fieldset/Fieldset';
import { Button } from 'primereact/components/button/Button';
import { Slider } from 'primereact/components/slider/Slider';

import './genericNode.css';

class GenericNode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            name: null,
            type: null,
            isWaveShaperOrDelay: false
        };
        this.onValueChange = this.onValueChange.bind(this);
        this.displayProperValue = this.displayProperValue.bind(this);
        this.removeNode = this.removeNode.bind(this);
    }

    componentDidMount() {
        if (this.props.isMaster)
            this.setState({ value: 0.5, name: 'Master' });
        else {
            this.setState({ type: this.props.node.type });
            this.props.node.type ? this.setState({ value: this.props.node.gain ? this.props.node.gain.value : 50, name: this.props.node.type }) : 
            this.setState({ value: this.props.node.gain ? this.props.node.gain.value : 0.5, name: this.props.node.constructor.name });
            this.props.node.constructor.name === 'WaveShaperNode' || this.props.node.constructor.name === 'DelayNode' ?
                this.setState({ isWaveShaperOrDelay: true, name: this.props.node.constructor.name }) : this.setState({ isWaveShaperOrDelay: false, name: this.props.node.constructor.name });
        }
    }

    onValueChange(event) {
        this.state.type ? this.setState({ value: event.value }) : this.setState({ value: event.value / 100 });
        this.props.nodeValueCreator(this.props.index, this.props.node, event.value);
    }

    removeNode() {
        this.props.removeNodeCreator(this.props.index);
    }

    displayProperValue() {
        this.state.type ? this.state.value : Math.round(this.state.value * 100);
    }

    render() {
        return (
            <div>
                <Fieldset className='node-body' legend={this.state.name} toggleable={true}>
                    <div className="generic-node-wrapper">
                        {this.state.isWaveShaperOrDelay ? <h3 className='node-inner-label'>{this.state.name}</h3> : <h3>value: {this.state.type ? this.state.value : Math.round(this.state.value * 100)}</h3>}
                        {!this.state.isWaveShaperOrDelay && <Slider className='node-slider' orientation='vertical' animate={true} value={this.state.type ? this.state.value : Math.round(this.state.value * 100)} onChange={this.onValueChange} />}
                        <Button className='remove-button' label='Remove' onClick={this.removeNode} disabled={this.props.isMaster} />
                    </div>
                </Fieldset>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ nodeValueCreator, removeNodeCreator }, dispatch);

export default connect(null, mapDispatchToProps)(GenericNode);