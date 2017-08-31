import React from 'react';
import './dial.scss';

const Dial = (props) => {
    return (
        <ul className='circle-container'>
            {props.angles.map((angle, i) => {
                <li><div className='circle-element'>{i}</div></li>
            })
            }
        </ul>
    );
}
export default Dial;