import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class DistortionNode extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            distortionValue: 400
        }
        
        this.onValueChange = this.onValueChange.bind(this);
    }

    componentDidMount() {
        this.props.addNodeCreator(this.props.node);
    }

    onValueChange(event) {
        this.setState({ distortionValue: event.value });
    }

    render() {
        return (
            <div>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        distortionValue: store.audio.currentChain[0].gain.value
        }
    }
}

export default connect(mapStateToProps)(DistortionNode);