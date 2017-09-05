import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { initializeAudioContext } from '../audio/audioInitializer/actions';

import NodePanel from '../common/nodePanel';

class StudioPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioContext: null
        }
    }
    
    componentDidMount() {
        console.log('STUDIO PAGE CDM!');
        this.props.dispatch(initializeAudioContext());
        this.setState({ audioContext: this.props.audioContext });
    }
    
    render() {
        return (
            <div>
                <Link to='/audio'>Audio</Link>
                <NodePanel />
            </div>
        );
    }
}

StudioPage.propTypes = {
    dispatch: Function
}

const mapStateToProps = (store) => {
    return {
        audioContext: store.audioInitializer.audioContext
    }
}

export default connect(mapStateToProps)(StudioPage);
