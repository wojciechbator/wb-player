import React from 'react';
import './dial.scss';

const Dial = (props) => (
    <ul className='circle-container'>
        {props.angles.map((angle, i) => {
            <li key={i}><div className='circle-element'>{i}</div></li>
        })
        }
    </ul>
);

export default Dial;