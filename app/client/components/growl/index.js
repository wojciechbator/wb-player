import React, { Component } from 'react';

import './growl.css';

export default class Growl extends Component {
    constructor(props){
        super();
        this.showGrowl = true;
        this.growlTimeout;
    }

    componentWillUnmount() {
        clearInterval(this.growlTimeout);
    }

    render() {
        this.growlTimeout = setTimeout(() => this.showGrowl = false, this.props.liveTime);
        return (
            this.showGrowl &&
            <div className={this.props.positive === true ? 'growl-wrapper-positive' : 'growl-wrapper-negative'} onClick={this.props.onClick} >
                <div className='growl-head'>{this.props.header}</div>
                <div className='growl-body'>{this.props.body}</div>
            </div>
        );
    }
}