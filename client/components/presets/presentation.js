import React from 'react';
import { OrderList } from 'primereact/components/orderlist/OrderList';
import './presets.css';

const Presets = (props) => (
    <div className="presets-container">
        <OrderList value={props.presets} dragdrop={true} itemTemplate={props.itemTemplate} responsive={true} header='Presets' />
    </div>
);

export default Presets;