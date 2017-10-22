import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { gainValuesCreator, addNodeCreator } from '../../../redux/actions/audioActions';
import audioChain from '../../../utils/audioChain';
import { Fieldset } from 'primereact/components/fieldset/Fieldset';
import { Slider } from 'primereact/components/slider/Slider';

import './filter.css';

class FilterNode extends Component {
    constructor(props) { 
        super(props);

        this.onValueChange = this.onValueChange.bind(this);
    }

    onValueChange(event) {
        this.setState({ filterNode: {lowpass: { value: event.value } } });
    }

    render() {
        return (
            <div>
                <div>
                    <Fieldset legend={this.props.type} toggleable={true}>
                        <div className="wrapper">
                            <h3>{this.props.type}: {this.props.value}</h3>
                            <Slider className="slider" orientation='vertical' animate={true} value={this.props.value} onChange={this.onValueChange} />
                        </div>
                    </Fieldset>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        filterNode: {
            gain: {
                value: store.audio.gainNode.volume
            }
        }
    }
}

// const mapDispatchToProps = (dispatch) => bindActionCreators({gainValuesCreator, addNodeCreator}, dispatch);

export default connect(mapStateToProps, null)(FilterNode);