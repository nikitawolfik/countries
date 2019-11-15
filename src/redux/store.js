import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { spawn } from 'redux-saga/effects';
import createReduxPromiseListener from 'redux-promise-listener';

import apiSetup from './helpers/setup';
import { entities } from './reducers';
import { utils } from './types';
import sagas from './sagas';

const promiseListener = createReduxPromiseListener();
const sagaMiddleware = createSagaMiddleware();
let enhancers = compose(applyMiddleware(sagaMiddleware, promiseListener.middleware));

if (process.env.NODE_ENV === 'development') {
  enhancers = compose(
    applyMiddleware(sagaMiddleware, promiseListener.middleware),
    // eslint-disable-next-line
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  );
}

const reducers = combineReducers({
  api: combineReducers(apiSetup.reducers),
  entities,
});

const rootReducer = (state, action) => {
  if (action.type === utils.resetState) {
    // eslint-disable-next-line
    state = undefined;
  }

  return reducers(state, action);
};

const store = createStore(rootReducer, enhancers);

// eslint-disable-next-line
sagaMiddleware.run(function* () {
  // eslint-disable-next-line
  for (const saga of [apiSetup.rootSaga, ...sagas]) {
    yield spawn(saga);
  }
});

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./reducers', () => {
    // eslint-disable-next-line
    const nextRootReducer = require('./reducers').default;
    store.replaceReducer(nextRootReducer);
  });
}

export {
  store,
  promiseListener,
};
