import React, { Component } from 'react';
import {AutoComplete} from 'primereact/components/autocomplete/AutoComplete';
import {Button} from 'primereact/components/button/Button';

import './search.css';

export default class Search extends Component {
    constructor() {
        super();
        this.state = { };
    }
    
    componentDidMount() {
        this.brands = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo'];
    }
    
    onBrandValueChange(e) {
        this.setState({ brand: e.value, filteredBrands: null });
    }
    
    filterBrands(event) {
        var results = this.brands.filter((brand) => {
             return brand.toLowerCase().startsWith(event.query.toLowerCase());
        });
        this.setState({ filteredBrands: results });
    }
    
    render() {
        return (
            <div>
                <AutoComplete value={this.state.brand} suggestions={this.state.filteredBrands} completeMethod={this.filterBrands.bind(this)} />
                <Button label="SEARCH" className="ui-button-primary" />
            </div>
        );
    }
}
