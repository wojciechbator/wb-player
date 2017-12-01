import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from './reducers';
import storeLogger from '../utils/storeLogger';


const configureStore = (initialState, routing) => createStore(reducers, initialState, compose(
    applyMiddleware(thunk, routing, storeLogger),
));

export default configureStore;