import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DataList } from 'primereact/components/datalist/DataList';
import { Fieldset } from 'primereact/components/fieldset/Fieldset';
import Card from './Card';
import './draggable.css';

class DraggableList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes: ['a', 'b', 'c']
        }
    }

    render() {
        console.log(this.props);
        return (
            <div className="draggable-list">
                <DataList value={this.state.nodes} header="Audio nodes">
                    {this.state.nodes.map((element, i) => <Card key={i} text={element} />)}
                </DataList>
            </div>
        );
    }
}

export default connect()(DraggableList);