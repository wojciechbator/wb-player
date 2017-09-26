import { captureAudio } from './audioInitializer';

async function audioChain(previousNode, currentNode, nextNode, isFirst, isLast, audioContext) {
    const inputStream = await captureAudio(audioContext);
    console.log(inputStream);
    inputStream.connect(currentNode);
    currentNode.connect(audioContext.destination);
}

export default audioChain;