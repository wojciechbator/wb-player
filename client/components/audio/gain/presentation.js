import React, { Component } from 'react';
import { Fieldset } from 'primereact/components/fieldset/Fieldset';
import { Slider } from 'primereact/components/slider/Slider';

import './gain.css';

const Gain = (props) => (
    <Fieldset legend={props.type}>
        <div className="wrapper">
            <h3>Volume: {props.volume}</h3>
            <Slider orientation='vertical' animate={true} value={props.volume} onChange={props.onVolumeChange} />
        </div>
    </Fieldset>
);

export default Gain;
