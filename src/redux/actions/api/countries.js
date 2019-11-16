import { getCountries } from '../../helpers/constants';
import axios from '../../helpers/setup';

const request = () => ({
  type: getCountries.request,
});

const success = (payload) => ({
  type: getCountries.success,
  data: payload.data,
});

const failure = (error) => ({
  type: getCountries.failure,
  error,
});

export const getCountryNames = () => (
  dispatch => {
    dispatch(request());
    axios.get('/all')
      .then(res => dispatch(success(res)))
      .catch(err => dispatch(failure(err)));
  }
);