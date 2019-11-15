import { put } from 'redux-saga/effects';
import apiProvider from 'redux-entities';
import { camelizeKeys } from 'humps';

import config from 'config';
import { api } from '../actions';

const tokenSelector = state => null;

const beforeSuccess = ({ payload, withSchema, result }) => {
  const data = camelizeKeys(payload, (key, convert) => {
    if (/[-\s]+(.)?/g.test(key)) {
      return key;
    }
    return convert(key);
  });

  if (withSchema && result.count && Array.isArray(result.results)) {
    data.count = result.count;
    data.next = result.next;
    data.previous = result.previous;
  }
  return data;
};

const beforeFailure = ({ error }) => {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line
    console.log(error);
  }
};

function* failure({ error }) {
  if (error.response && error.response.status) {
    const { response } = error;
    // We use JWT, so if token becomes invalid, just logout
    if (response.status === 401) {
      yield put(api.auth.signout());
    }
  }
}

export default apiProvider({
  tokenSelector,
  hooks: {
    beforeSuccess,
    beforeFailure,
    failure,
  },
  authorizationType: 'JWT',
  path: config.path,
  getHeaders: () => ({}),
});
