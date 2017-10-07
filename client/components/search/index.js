import React, { Component } from 'react';
import { connect } from 'react-redux';
import {AutoComplete} from 'primereact/components/autocomplete/AutoComplete';
import {Button} from 'primereact/components/button/Button';
import { autocompleteValueCreator } from '../../redux/actions/autoCompleteActions';

import './search.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileNames: [],
            autocompleteValue: null
        };
        this.fetchFileNames = this.fetchFileNames.bind(this);
        this.filterFileNames = this.filterFileNames.bind(this);
    }

    gatherAutocompleteData(event) {
        autocompleteValueCreator(event.value);
    }
    
    componentDidMount() {
        this.fileNames = this.fetchFileNames();
    }

    fetchFileNames() {
        fetch('/soundFiles').then(response => {
            return response.text();
        }).then(data => {
            this.setState({ fileNames: JSON.parse(data) });
        })
    }
    
    onBrandValueChange(e) {
        this.setState({ fileName: e.value, filteredFileNames: null });
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
            <div>
                <AutoComplete value={this.state.fileName} suggestions={this.state.filteredFileNames} completeMethod={this.filterFileNames} onChange={this.gatherAutocompleteData} />
                <Button label="SEARCH" />
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        autocompleteValue: store.autocomplete.autocompleteValue
    }
}

export default connect(mapStateToProps)(Search);
