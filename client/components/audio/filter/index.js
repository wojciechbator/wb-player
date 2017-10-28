import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { nodeValueCreator } from '../../../redux/actions/audioActions';
import { Fieldset } from 'primereact/components/fieldset/Fieldset';
import { Button } from 'primereact/components/button/Button';
import { Slider } from 'primereact/components/slider/Slider';

import './filter.css';

class FilterNode extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            value: 50
        }
        this.onValueChange = this.onValueChange.bind(this);
    }

    componentDidMount() {
        this.props.nodeValueCreator(this.props.key, this.state.value);
    }

    onValueChange(event) {
        this.setState({ value: event.value });
        this.props.nodeValueCreator(this.props.key, event.value);
    }

    render() {
        return (
            <div>
                <Fieldset legend={this.props.type} toggleable={true}>
                    <div className="wrapper">
                        <h3>{this.props.currentNode.type}: {this.state.value}</h3>
                        <Slider orientation='vertical' animate={true} value={this.state.value} onChange={this.onValueChange} />
                    </div>
                    <Button label="REMOVE" onClick={this.props.removeNode}/>
                </Fieldset>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        value: store.audio.currentChain[this.props.key].gain.value
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({nodeValueCreator}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FilterNode);