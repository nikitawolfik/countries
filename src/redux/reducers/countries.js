import { getCountries } from '../helpers/constants';

const initialState = {
  loaded: false,
  loading: false,
  error: null,
  data: null,
};

export default (state = initialState, action) => {
  if (action.type === getCountries.request) {
    return ({
      ...state,
      loaded: false,
      loading: true,
    });
  }

  if (action.type === getCountries.failure) {
    return ({
      ...state,
      loaded: false,
      loading: false,
      error: action.error,
    });
  }

  if (action.type === getCountries.success) {
    return ({
      ...state,
      loaded: true,
      loading: false,
      data: action.data,
    });
  }

  return state;
}
