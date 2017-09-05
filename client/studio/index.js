import React, { Component } from 'react';
import { Link } from 'react-router';
import AudioInitializer from '../audio/audioInitializer';

import NodePanel from '../common/nodePanel';

export default class StudioPage extends Component {
    constructor(props) {
        super(props);
    }
      
    render() {
        return (
            <div>
                <Link to='/audio'>Audio</Link>
                <NodePanel />
                <AudioInitializer />
            </div>
        );
    }
}
