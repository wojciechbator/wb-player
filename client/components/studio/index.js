import React, { Component } from 'react';

import GainNode from '../audio/gain';

export default class StudioPage extends Component {
    constructor(props) {
        super(props);
    }
      
    render() {
        return (
            <div>
                <GainNode />
            </div>
        );
    }
}
