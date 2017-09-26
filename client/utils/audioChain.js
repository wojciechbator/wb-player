import { captureAudio } from './audioInitializer';

async function audioChain(previousNode, currentNode, nextNode, isFirst, isLast, audioContext) {
    const inputStream = await captureAudio(audioContext);
    isFirst && inputStream.connect(currentNode);
    isLast && currentNode.connect(audioContext.destination);
}

export default audioChain;