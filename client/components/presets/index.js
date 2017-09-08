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
                <div>A - B - C</div>
            </div>
        );
    }
    
    render() {
        return (
            <Presets presets={presets} itemTemplate={this.presetsTemplate} />
        )
    }
}

const mapStateToProps = (store) => {
    return {
        
    }
    
}

export default connect(mapStateToProps)(PresetsContainer);