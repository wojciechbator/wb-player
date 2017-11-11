import { AUTOCOMPLETE_VALUE } from '../types/autoCompleteTypes'

const gatherAutocompleteValue = (autocompleteValue) => {
    return {
        type: AUTOCOMPLETE_VALUE,
        autocompleteValue
    }
}

export const autocompleteValueCreator = (autocompleteValue) => {
    return dispatch => {
        dispatch(gatherAutocompleteValue(autocompleteValue));
    }
}