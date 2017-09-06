import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from './reducers';
import storeLogger from '../utils/storeLogger';

const store = createStore(reducers, compose(
    applyMiddleware(thunk, storeLogger),
));

export default store;