import { createType } from 'redux-entities';


export const getCountryNames = createType({
  type: 'get-country-names',
  reducer: 'getCountryNames',
  flushErrorsOnRequest: true,
});
