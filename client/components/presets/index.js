import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Presets from './presentation';

class PresetsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            presets: []
        }
    }

    render() {
        return (
            <div>
                <Presets />
            </div>
        )
    }
}

const mapStateToProps = (store) => {

}

export default connect(mapStateToProps)(PresetsContainer);