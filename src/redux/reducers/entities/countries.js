import Immutable from 'seamless-immutable';
import { api } from 'redux/types';

export const initialState = Immutable({
  data: [],
});

export default (state = initialState, action) => {
  if (action.type === api.countries.getCountryNames.success) {
    return Immutable(state).merge({
      data: action.payload,
    });
  }

  return state;
};
