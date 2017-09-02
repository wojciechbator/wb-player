import React, { Component } from 'react';
import Dial from 'react-dial';

export default class AudioKnob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 25
        }
    }

    handleChange(newValue) {
        this.setState({value: newValue});
    }

    render() {
        return (
            <Dial value={this.state.value} onChange={this.handleChange} angleOffset={135} angleArc={270} lineCap='round' />
        );
    }
}