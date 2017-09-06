import React, { Component } from 'react';
import { Link } from 'react-router';

import GainNode from '../audio/gain';

export default class StudioPage extends Component {
    constructor(props) {
        super(props);
    }
      
    render() {
        return (
            <div>
                <Link to='/audio'>Audio</Link>
                <GainNode />
            </div>
        );
    }
}
