import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
  countries,
  entities,
} from './reducers'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  api: combineReducers({
    getCountries: countries,
  }),
  entities,
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export {
  store,
};
