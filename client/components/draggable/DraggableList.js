import React, { Component } from 'react';
import { DataList } from 'primereact/components/datalist/DataList';
import { Fieldset } from 'primereact/components/fieldset/Fieldset';
import Card from './Card';
import './draggable.css';

export default class DraggableList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: ['A', 'B', 'C']
        }
    }

    render() {
        return (
            <div className="draggable-list">
                <DataList value={this.state.nodes} header="Audio nodes">
                    {this.state.nodes.map((element, i) => <Card text={element} />)}
                </DataList>
            </div>
        );
    }
}