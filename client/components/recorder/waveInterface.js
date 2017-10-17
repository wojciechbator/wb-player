import encodeWAV from './waveEncoder';

/*
interface Navigator {
  webkitGetUserMedia?: typeof navigator.getUserMedia,
  mozGetUserMedia?: typeof navigator.getUserMedia,
  msGetUserMedia?: typeof navigator.getUserMedia,
};
navigator.getUserMedia = navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia;
*/

export default class WAVEInterface {
  constructor() {
    this.playbackNode;
    this.recordingNodes = [];
    this.recordingStream;
    this.buffers;
    this.encodingCache;
    this.audioContext = new AudioContext();
    this.bufferSize = 2048;

  }

  get bufferLength() { return this.buffers[0].length * WAVEInterface.bufferSize; }
  get audioDuration() { return this.bufferLength / WAVEInterface.audioContext.sampleRate; }
  get audioData() {
    return this.encodingCache || encodeWAV(this.buffers, this.bufferLength, WAVEInterface.audioContext.sampleRate);
  }

  startRecording() {
    return new Promise((resolve, reject) => {
      navigator.getUserMedia({ audio: true }, (stream) => {
        const recGainNode = this.audioContext.createGain();
        const recSourceNode = this.audioContext.createMediaStreamSource(stream);
        const recProcessingNode = audioContext.createScriptProcessor(WAVEInterface.bufferSize, 2, 2);
        if (this.encodingCache) this.encodingCache = null;

        recProcessingNode.onaudioprocess = (event) => {
          console.log('audio process', this);
          if (this.encodingCache) this.encodingCache = null;
          // save left and right buffers
          for (let i = 0; i < 2; i++) {
            const channel = event.inputBuffer.getChannelData(i);
            this.buffers[i].push(new Float32Array(channel));
          }
        };

        recSourceNode.connect(recGainNode);
        recGainNode.connect(recProcessingNode);
        recProcessingNode.connect(this.audioContext.destination);

        this.recordingStream = stream;
        this.recordingNodes.push(recSourceNode, recGainNode, recProcessingNode);
        resolve(stream);
      }, (err) => {
        reject(err);
      });
    });
  }

  stopRecording() {
    if (this.recordingStream) {
      this.recordingStream.getTracks()[0].stop();
      delete this.recordingStream;
    }
    for (let i in this.recordingNodes) {
      this.recordingNodes[i].disconnect();
      delete this.recordingNodes[i];
    }
  }

  startPlayback(loop = false, onended) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(this.audioData);
      reader.onloadend = () => {
        this.audioContext.decodeAudioData(reader.result, (buffer) => {
          const source = this.audioContext.createBufferSource();
          source.buffer = buffer;
          source.connect(this.audioContext.destination);
          source.loop = loop;
          source.start(0);
          source.onended = onended;
          this.playbackNode = source;
          resolve(source);
        });
      };
    });
  }

  stopPlayback() {
    this.playbackNode.stop();
  }

  reset() {
    if (this.playbackNode) {
      this.playbackNode.stop();
      this.playbackNode.disconnect(0);
      delete this.playbackNode;
    }
    this.stopRecording();
    this.buffers = [[], []];
  }
}
