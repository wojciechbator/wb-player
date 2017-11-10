import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OrderList } from 'primereact/components/orderlist/OrderList';
import { addNodeCreator } from '../../redux/actions/audioActions';
import './nodesList.css';

class NodesList extends Component {
    constructor(props) {
        super(props);
        this.nodeTemplate = this.nodeTemplate.bind(this);
    }

    addAudioToChain(node) {
        this.props.addNodeCreator(node);
    }

    nodeTemplate(node) {
        let name = node.type ? node.type : node.constructor.name;
        if (!name) return;
        return (
            <div onClick={() => this.addAudioToChain(node)}>{name}</div>
        );
    }

    render() {
        return (
            <div className='nodes-container'>
                <div className='nodes-header'>Available nodes</div>
                <div className='nodes-list'>
                    {this.props.availableNodes.map((node, key) => node.type ? <div key={key} className='node'>{node.type}</div> : <div key={key} className='node'>{node.constructor.name}</div>)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        availableNodes: store.audio.availableNodes,
        currentChain: store.audio.currentChain
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ addNodeCreator }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NodesList);

