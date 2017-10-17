import React, { Component } from 'react';
import { connect } from 'react-redux';

import Presets from './presentation';

const presets = ['Hard rock', 'Ballad', 'Jazz'];

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
                <div>{preset}</div>
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