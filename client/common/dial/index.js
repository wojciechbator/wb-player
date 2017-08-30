import React from 'react';
import './dial.css';

const Dial = (props) => {
    return (
        <div className='knob-surround'>
            <div className='knob'></div>
            <span className='min'>Min</span>
            <span className='max'>Max</span>
            <div className='ticks'>
                {props.angles.map((angle, i) => { return <div key={i} className='tick' style={{ transform: `rotate(${angle})` }}></div> })}
            </div>
        </div>
    );
}
export default Dial;