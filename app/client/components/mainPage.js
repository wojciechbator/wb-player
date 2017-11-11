import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';
import { Sidebar } from 'primereact/components/sidebar/Sidebar';
// import { Chart } from 'primereact/components/chart/Chart';

import { storeSocketCreator } from '../redux/actions/socketActions';
import StudioPage from './studio';
import Presets from './presets';
import NodesList from './nodesList';
import AudioInitializer from '../utils/audioInitializer';
import AudioChain from '../utils/audioChain';
import Header from './header';
import Footer from './footer';

import './mainLayout.css';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSidebar: false
        }
        this.showSidebar = this.showSidebar.bind(this);
        this.hideSidebar = this.hideSidebar.bind(this);
    }

    showSidebar() {
        this.setState({ showSidebar: true });
    }

    hideSidebar() {
        this.setState({ showSidebar: false });
    }

    componentDidMount() {
        const socket = io();
        this.props.storeSocketCreator(socket);
    }

    render() {
        return (
            <div className='app-container'>
                <AudioInitializer />
                <Sidebar visible={this.state.showSidebar} position='right' onHide={this.hideSidebar}>
                    <div className='sidebar-context'>
                        Content here
                        {/* <Chart type='line' />
                        <Chart type='doughtnut' />
                        <Chart type ='bar' /> */}
                    </div>
                </Sidebar>
                <button className='class="ui-button ui-widget ui-state-default ui-corner-all show-sidebar-button ui-button-text-only' onClick={this.showSidebar}><i className="fa fa-arrow-left"></i></button>
                {this.props.inputStream && <AudioChain inputStream={this.props.inputStream} />}
                <Header />
                <div className='content-wrapper'>
                    <div className='left-menu'>
                        <Presets />
                        <NodesList />
                    </div>
                    <StudioPage />
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        inputStream: state.audio.inputStream
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ storeSocketCreator }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);