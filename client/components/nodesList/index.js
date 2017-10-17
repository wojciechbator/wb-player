import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DataList } from 'primereact/components/datalist/DataList';
import { Fieldset } from 'primereact/components/fieldset/Fieldset';
import './nodesList.css';

class NodesList extends Component {
    constructor(props) {
        super(props);
        this.addAudioToChain = this.addAudioToChain.bind(this);
    }

    addAudioToChain(node) {
        //ADD TO END OF CHAIN, MAYBE PUSH / CONCAT?
    }

    render() {
        let names = [];
        this.props.currentChain.map(element => names.push(element.constructor.name));
        return (
            <div className="nodes-list">
                <DataList value={names} header="Audio nodes">
                    {this.props.currentChain.map((element, i) => <div key={i} text={element.constructor.name} />)}
                </DataList>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        currentChain: store.audio.currentChain
    }
}

export default connect(mapStateToProps)(NodesList);