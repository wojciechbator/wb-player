const audioContextMerger = (backgroundContext, playingContext) => {
    const outputContext = new AudioContext();
    const merger = outputContext.createChannelMerger(2);
    backgroundContext.connect(merger, 0, 1);
    playingContext.connect(merger, 1, 0);
    const destination = outputContext.createMediaStreamDestination();
    merger.connect(destination);
    return outputContext;
}