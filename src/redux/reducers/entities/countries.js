import Immutable from 'seamless-immutable';
import { getCountries } from '../../helpers/constants';

export const initialState = {
  data: [],
};

export default (state = initialState, action) => {
  if (action.type === getCountries.success) {
    return ({
      data: action.data || [],
    })
  }

  return state;
};
