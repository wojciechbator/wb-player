import React, { Component } from 'react';
import { connect } from 'react-redux';

import './diagnostics.css';

window.requestAnimationFrame = window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

class Diagnostics extends Component {
  constructor(props) {
    super(props);
    this.drawOnCanvas = this.drawOnCanvas.bind(this);
    this.context = null;
  }

  componentDidMount() {
    this.canvas.style.width = '100%';
    this.canvas.width = this.canvas.offsetWidth;
    this.context = this.canvas.getContext('2d');
    this.drawValue = requestAnimationFrame(this.drawOnCanvas);
  }

  componentDidUpdate(prevProps, prevState) {
    this.drawValue = requestAnimationFrame(this.drawOnCanvas);
  }

  drawOnCanvas() {
    const dataArray = new Uint8Array(this.props.analyserNode.frequencyBinCount);
    this.props.analyserNode.getByteFrequencyData(dataArray);
    this.context.fillStyle = '#140703';
    this.canvas && this.context.fillRect(0, 0, this.canvas.width, this.canvas.width);
    const barWidth = (this.canvas.width / this.props.analyserNode.frequencyBinCount) * 2.5 - 1;
    let barHeight;
    let parameter = 0;
    for (let i = 0; i < this.props.analyserNode.frequencyBinCount; i++) {
      barHeight = dataArray[i];
      this.context.fillStyle = 'rgb(' + (barHeight + 100) + ', 50, 50)';
      this.context.fillRect(parameter, this.canvas.height - barHeight / 2, barWidth, barHeight);
      parameter += barWidth;
    }
    this.drawValue = requestAnimationFrame(this.drawOnCanvas);
  }

  render() {
    return (
      <canvas
        className="react-music-canvas"
        height={150}
        ref={(c) => { this.canvas = c; }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    analyserNode: state.audio.analyserNode
  }
}

export default connect(mapStateToProps)(Diagnostics);