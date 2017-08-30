import React from 'react';
import './dial.css';

const Tick = (props) => (
    <div className="tick" style={{ transform: rotate(props.angle) }}></div>
);

const Dial = (props) => {
    let angles = [27, 54, 81, 108, 135, 162, 189, 216, 243];
    return (
        <div className="knob-surround">
            <div className="knob"></div>
            <span className="min">Min</span>
            <span className="max">Max</span>
            <div className="ticks">
                {angles.forEach(angle => { return <Tick angle={angle} /> })}
            </div>
        </div>
    );
}
export default Dial;