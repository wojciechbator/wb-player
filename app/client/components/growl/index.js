import React from 'react';

import './growl.css';

const Growl = props => (
    props.showGrowl === true &&
    <div className={props.positive === true ? 'growl-wrapper-positive' : 'growl-wrapper-negative'}
         onClick={props.onClick}>
        <div className='growl-head'>{props.header}</div>
        <div className='growl-body'>{props.body}</div>
    </div>
);

export default Growl;