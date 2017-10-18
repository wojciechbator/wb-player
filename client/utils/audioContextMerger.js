export const audioContextMerger = (backgroundPlayer, mainPlayer) => {
    const outputContext = new AudioContext();
    const merger = outputContext.createChannelMerger(2);
    backgroundPlayer.connect(merger, 0, 1);
    mainPlayer.connect(merger, 1, 0);
    const destination = outputContext.createMediaStreamDestination();
    merger.connect(destination);
    return outputContext;
}