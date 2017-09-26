import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

const cardSource = {
    beginDrag(props) {
        return {
            text: props.text
        };
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
}

const propTypes = {
    text: PropTypes.string.isRequired,
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired
};

class Card extends Component {
    render() {
        const { isDragging, connectDragSource, text } = this.props;
        return connectDragSource(
            <div style={{ opacity: isDragging ? 0.5 : 1 }}>
            {text}
            </div>
        );
    }
}

Card.propTypes = propTypes;

export default DragSource(Card, cardSource, collect)(Card);