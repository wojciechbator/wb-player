import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {AutoComplete} from 'primereact/components/autocomplete/AutoComplete';
import { autocompleteValueCreator } from '../../redux/actions/autoCompleteActions';

import './search.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileNames: [],
            autocompleteValue: null
        };
        this.gatherAutocompleteData = this.gatherAutocompleteData.bind(this);
        this.fetchFileNames = this.fetchFileNames.bind(this);
        this.filterFileNames = this.filterFileNames.bind(this);
    }

    componentDidMount() {
        this.fetchFileNames();
    }

    gatherAutocompleteData(event) {
        this.props.autocompleteValueCreator(event.value);
    }   

    fetchFileNames() {
        fetch('/soundFiles').then(response => {
            return response.text();
        }).then(data => {
            this.setState({ fileNames: JSON.parse(data) });
        })
    }
    
    filterFileNames(event) {
        const results = this.state.fileNames.filter(fileName => {
            if (event.query)
                return fileName.toLowerCase().startsWith(event.query.toLowerCase());
        });
        this.setState({ filteredFileNames: results });
    }
    
    render() {
        return (
            <div className="search-module">
                <div className="search-header">Find Your song...</div>
                <AutoComplete className="search-input" value={this.state.fileName} suggestions={this.state.filteredFileNames} completeMethod={this.filterFileNames} onChange={this.gatherAutocompleteData} />
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        autocompleteValue: store.autocomplete.autocompleteValue
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ autocompleteValueCreator }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Search);
