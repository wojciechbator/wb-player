import React, { Component } from 'react';
import { Fieldset } from 'primereact/components/fieldset/Fieldset';
import { Slider } from 'primereact/components/slider/Slider';

const Gain = (props) => (
    <Fieldset legend={props.type}>
        <h3>Volume: {props.volume}</h3>
        <Slider orientation='vertical' animate={true} value={props.volume} onChange={props.onVolumeChange} />
    </Fieldset>
);

export default Gain;
