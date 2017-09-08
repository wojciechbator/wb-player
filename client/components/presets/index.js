import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Presets from './presentation';

const presets = ['a', 'b', 'c'];

class PresetsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            presets: []
        }

        this.presetsTemplate = this.presetsTemplate.bind(this);
    }

    presetsTemplate(preset) {
        if (!preset) return;

        return (
            <div className="ui-helper-clearfix">
                <div style={{ display: 'inline-block', margin: '2px 0 2px 2px' }}>Obrazek</div>
                <div style={{ fontSize: '14px', float: 'right', margin: '15px 5px 0 0' }}>{car.brand} - {car.year} - {car.color}</div>
            </div>
        );
    }

    render() {
        return (
            <div>
                {/* <Presets presets={Presets} itemTemplate={this.presetsTemplate} /> */}
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        
    }

}

export default connect(mapStateToProps)(PresetsContainer);