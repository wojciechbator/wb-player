import React, { Component } from 'react';
import { connect } from 'react-redux';

class Diagnostics extends Component {
    constructor(props) {
        super(props);
        this.drawOnCanvas = this.drawOnCanvas.bind(this);
    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        this.drawOnCanvas(canvas);
    }

    drawOnCanvas(canvas) {
        const canvasContext = canvas.getContext('2d');
        const bufferLength = this.props.analyserNode.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const drawVisual = requestAnimationFrame(this.drawOnCanvas);
        this.props.analyserNode.getByteTimeDomainData(dataArray);
        this.setState({ canvasContext: { fillStyle: 'rgb(200, 200, 200)' } });
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
        this.setState({ canvasContext: { lineWidth: 2, strokeStyle: 'rgb(0, 0, 0)' } });
        canvasContext.beginPath();
        const sliceWidth = canvas.width * 1.0 / bufferLength;
        let x = 0;
        for (let i = 0; i < bufferLength; i++) {
            const sample = dataArray[i] / 128.0;
            const factor = sample * canvas.height / 2;
            i === 0 ? canvasContext.moveTo(sample, factor) : canvasContext.lineTo(sample, factor);
            x += sliceWidth;
        }

        canvasContext.lineTo(canvas.width, canvas.height / 2);
        canvasContext.stroke();
    }

    render() {
        return (
            <canvas ref='canvas' />
        );
    }
}

const mapStateToProps = state => {
    return {
        analyserNode: state.audio.analyserNode
    }
}

export default connect(mapStateToProps)(Diagnostics);