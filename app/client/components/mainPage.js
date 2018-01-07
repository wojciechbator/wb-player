import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';
import { Sidebar } from 'primereact/components/sidebar/Sidebar';
import { Chart } from 'primereact/components/chart/Chart';

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
            showSidebar: false,
            cpuUsage: [],
            usedMemory: 0,
            freeMemory: 0
        }
        this.socket = io();
        this.showSidebar = this.showSidebar.bind(this);
        this.hideSidebar = this.hideSidebar.bind(this);
    }

    componentDidMount() {
        this.props.storeSocketCreator(this.socket);
        this.socket.on('cpu', data => {
            let bufferArray = this.state.cpuUsage;
            if (bufferArray.length > 9) {
                bufferArray.shift();
            }
            bufferArray.push(data.system / data.user * 100);
            this.setState({ cpuUsage: bufferArray });
        });
        this.socket.on('memory', data => this.setState({ usedMemory: data.heapUsed, freeMemory: data.heapTotal - data.heapUsed }));
    }

    componentWillUnmount() {
        this.socket.emit('disconnect');
    }

    showSidebar() {
        this.setState({ showSidebar: true });
    }

    hideSidebar() {
        this.setState({ showSidebar: false });
    }

    render() {
        const data = {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            datasets: [
                {
                    label: 'CPU usage',
                    data: this.state.cpuUsage,
                    fill: false,
                    borderColor: '#4bc0c0'
                },
            ]
        };

        const options = {
            animation: false,
            scales:
                {
                    xAxes: [{
                        display: false
                    }]
                },
            title: {
                display: true,
                text: 'CPU usage',
                fontSize: 16
            },
            legend: {
                display: false
            }
        };

        const doughnutData = {
            datasets: [{
                data: [this.state.usedMemory, this.state.freeMemory],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                ],
            }],
            labels: [
                'Used heap',
                'Free heap'
            ]
        };

        const doughnutOptions = {
            animation: false,
            title: {
                display: true,
                text: 'Process heap usage',
                fontSize: 16
            },
            legend: {
                display: true
            }
        };

        return (
            <div className='app-container'>
                {
                    (this.props.isAuthenticated || sessionStorage.getItem('loggedUser')) &&
                    <div className='app-container'>
                        <AudioInitializer />
                        <Sidebar visible={this.state.showSidebar} position='right' onHide={this.hideSidebar}>
                            <div className='sidebar-content'>
                                <Chart className='diagnostics-chart' type='line' data={data} options={options} />
                                <Chart className='diagnostics-chart' type='doughnut' data={doughnutData} options={doughnutOptions} />
                            </div>
                        </Sidebar>
                        <button className='ui-widget ui-state-default ui-corner-all control-button ui-button-text-only show-sidebar-button' onClick={this.showSidebar}><i className='fa fa-arrow-left'></i></button>
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
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
        inputStream: state.audio.inputStream
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({ storeSocketCreator }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);