import React, { Component } from 'react';
import Search from '../search';

import './player.css';

export default class Player extends Component {
    render() {
        return (
            <div className="player-module">
                <Search />
            </div>
        );
    }
}