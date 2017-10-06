import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import './search.css';

export default class Search extends Component {
    handleRenderItem(item, isHighlighted) {
        return (
            <div style={isHighlighted ? 'highlightedItem' : 'item'}
                key={item.id} id={item.id}>{item.title}</div>
        );
    }


    render() {
        return (
                <Autocomplete
                    style='search-input'
                    ref="autocomplete"
                    inputProps={{ title: "Title" }}
                    value={this.props.autocompleteValue}
                    items={this.props.tracks}
                    getItemValue={(item) => item.title}
                    onSelect={this.props.handleSelect}
                    onChange={this.props.handleChange}
                    renderItem={this.handleRenderItem.bind(this)}
                />
        );
    }
}
