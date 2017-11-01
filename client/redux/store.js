import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from './reducers';
import storeLogger from '../utils/storeLogger';


const configureStore = (initialState, reduxRouting) => {
    return createStore(reducers, initialState, compose(
        applyMiddleware(thunk, reduxRouting, storeLogger),
    ));
} 

export default configureStore;