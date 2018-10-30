import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

//create the store for the login.
const store = createStore(
    reducers, 
    {},
    compose(applyMiddleware(thunk))
);

export default store;