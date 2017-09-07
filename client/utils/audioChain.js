const audioChain = (inputStream, previousNode, currentNode, nextNode, isFirst, isLast, audioContext) => {
    if (isFirst) {
        inputStream.connect(currentNode);
    } else if (isLast) {
        currentNode.connect(audioContext.destination);
    } else {
        previousNode.connect(currentNode);
        currentNode.connect(nextNode);
    }
}

export default audioChain;