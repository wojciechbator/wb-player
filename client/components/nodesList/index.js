import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DataList } from 'primereact/components/datalist/DataList';
import { Fieldset } from 'primereact/components/fieldset/Fieldset';
import './nodesList.css';

class NodesList extends Component {
    constructor(props) {
        super(props);
        this.addAudioToChain = this.addAudioToChain.bind(this);
        this.nodeTemplate = this.nodeTemplate.bind(this);
    }

    addAudioToChain(node) {
        console.log("TRYING TO ADD, NO LOGIC YET!");
    }

    nodeTemplate(node) {
        if(!node) return;
        return (
            <div className="available-node" onClick={this.addAudioToChain}>{node}</div>
        );
    }

    render() {
        let names = [];
        this.props.availableNodes.map(element => element.type ? names.push(element.type) : names.push(element.constructor.name));
        return (
            <div className="nodes-list">
                <DataList value={names} itemTemplate={this.nodeTemplate} header="Audio nodes">
                </DataList>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        availableNodes: store.audio.availableNodes
    }
}

export default connect(mapStateToProps)(NodesList);