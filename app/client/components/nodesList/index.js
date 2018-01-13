import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addNodeCreator} from '../../redux/actions/audioActions';
import './nodesList.css';

class NodesList extends Component {
    constructor(props) {
        super(props);
        this.addAudioToChain = this.addAudioToChain.bind(this);
    }

    addAudioToChain(node) {
        this.props.addNodeCreator(node);
    }

    render() {
        return (
            <div className='nodes-container'>
                <div className='nodes-header'>Nodes</div>
                <div className='nodes-list'>
                    {this.props.availableNodes.map((node, key) => node.type ?
                        <div key={key} className='node'
                             onDoubleClick={() => this.addAudioToChain(node)}>{node.type}</div> :
                        <div key={key} className='node'
                             onDoubleClick={() => this.addAudioToChain(node)}>{node.constructor.name}</div>)
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        availableNodes: store.audio.availableNodes,
        currentChain: store.audio.currentChain
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({addNodeCreator}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NodesList);

