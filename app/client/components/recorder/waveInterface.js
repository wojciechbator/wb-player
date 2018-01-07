import { encodeWAV } from './waveEncoder';

export default class WAVEInterface {
  constructor(context, analyserNode) {
    this.source = analyserNode;
    this.playbackNode;
    this.recordingNodes = [];
    this.recordingStream;
    this.buffers;
    this.encodingCache;
    this.audioContext = context;
    this.bufferSize = 2048;

  }

  get bufferLength() { return this.buffers[0].length * this.bufferSize; }
  get audioDuration() { return this.bufferLength / this.audioContext.sampleRate; }
  get audioData() {
    return this.encodingCache || encodeWAV(this.buffers, this.bufferLength, this.audioContext.sampleRate);
  }

  startRecording() {
    return new Promise((resolve, reject) => {
      const recSourceNode = this.source;
      const recProcessingNode = this.audioContext.createScriptProcessor(this.bufferSize, 2, 2);
      if (this.encodingCache) this.encodingCache = null;

      recProcessingNode.onaudioprocess = event => {
        if (this.encodingCache) this.encodingCache = null;
        for (let i = 0; i < 2; i++) {
          const channel = event.inputBuffer.getChannelData(i);
          this.buffers[i].push(new Float32Array(channel));
        }
      };

      recSourceNode.connect(recProcessingNode);
      recProcessingNode.connect(this.audioContext.destination);

      this.recordingStream = this.audioContext.createMediaStreamDestination(recProcessingNode).stream;
      this.recordingNodes.push(recSourceNode, recProcessingNode);
      resolve(this.recordingStream);
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
    this.source.connect(this.audioContext.destination);
  }

  startPlayback(loop = false, onended) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(this.audioData);
      reader.onloadend = () => {
        this.audioContext.decodeAudioData(reader.result, buffer => {
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
