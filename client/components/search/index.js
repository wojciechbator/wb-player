import React, { Component } from 'react';
import {AutoComplete} from 'primereact/components/autocomplete/AutoComplete';
import {Button} from 'primereact/components/button/Button';

import './search.css';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileNames: []
        };
        this.fetchFileNames = this.fetchFileNames.bind(this);
        this.filterFileNames = this.filterFileNames.bind(this);
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
                <AutoComplete value={this.state.fileName} suggestions={this.state.filteredFileNames} completeMethod={this.filterFileNames} onChange={this.filterFileNames} />
                <Button label="SEARCH" className="ui-button-primary" />
            </div>
        );
    }
}
