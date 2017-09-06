import React, { Component } from 'react';
import { Fieldset } from 'primereact/components/fieldset/Fieldset';
import { Slider } from 'primereact/components/slider/Slider';

const NodePanel = (props) => (
    <Fieldset legend={props.type}>
        <Slider orientation='vertical' animate value={props.volume} onChange={props.onVolumeChange} />
    </Fieldset>
);
