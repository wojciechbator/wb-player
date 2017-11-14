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
            value: 0.5,
            name: ''
        }
        this.onValueChange = this.onValueChange.bind(this);
    }

    componentDidMount() {
        this.props.node.type ? this.setState({ name: this.props.node.type }) : this.setState({ name: this.props.node.constructor.name });
    }

    onValueChange(event) {
        this.setState({ value: event.value / 100 });
        this.props.nodeValueCreator(this.props.index, event.value);
    }

    removeNode(node) {
        this.props.removeNodeCreator(node);
    }

    render() {
        return (
            <div>
                <Fieldset legend={this.state.name} toggleable={true}>
                    <div className="generic-node-wrapper">
                        <h3>value: {Math.round(this.state.value * 100)}</h3>
                        <Slider orientation='vertical' animate={true} value={Math.round(this.state.value * 100)} onChange={this.onValueChange} />
                        <Button label="Remove" onClick={() => this.removeNode(this.props.node)}/>
                    </div>
                </Fieldset>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({nodeValueCreator, removeNodeCreator}, dispatch);

export default connect(null, mapDispatchToProps)(GenericNode);