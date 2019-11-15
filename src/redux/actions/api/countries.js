import { api } from 'redux/types';

export const getCountryNames = (action) => ({
  ...action,
  type: api.countries.getCountryNames.request,
  url: 'all/',
  method: 'get',
});
