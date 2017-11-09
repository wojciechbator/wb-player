import React, { Component } from 'react';
import { connect } from 'react-redux';

class Diagnostics extends Component {
    constructor(props) {
        super(props);
        this.drawOnCanvas = this.drawOnCanvas.bind(this);
    }

    componentDidMount() {
        this.canvas.getContext('2d');
        this.props.analyser && this.drawOnCanvas(this.props.analyser);
    }

    drawOnCanvas(analyser) {
        if (this.ctx) {
            const gradient = this.ctx.createLinearGradient(0, 0, 0, 512);
            gradient.addColorStop(1, '#000000');
            gradient.addColorStop(0.75, '#2ecc71');
            gradient.addColorStop(0.25, '#f1c40f');
            gradient.addColorStop(0, '#e74c3c');
      
            const array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            this.ctx.clearRect(0, 0, 800, 512);
            this.ctx.fillStyle = gradient;
      
            for (let i = 0; i < (array.length); i++) {
              const value = array[i];
              this.ctx.fillRect(i * 12, 512, 10, value * -2);
            }
          }
        }
        render() {
          return (
            <canvas
              className="react-music-canvas"
              width="80%"
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