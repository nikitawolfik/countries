import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';

import { api } from 'redux/actions';
import { Modal, Input, ChooseLocale, CountryRow } from 'components';
import { LanguageContext } from 'context';
import { translate } from 'utils/translation';

import styles from './styles.module.scss';


const CountryData = ({ countries, getCountryNames }) => {
  const [data, setData] = React.useState(countries);
  const [modalTitle, setTitle] = React.useState('');
  const [content, setContent] = React.useState(null);

  React.useEffect(() => {
    getCountryNames();
  }, []);

  const onSubmit = ({ country }) => {
    console.log(country);
    if (country) {
      setData(countries.filter(c => c.name.toLowerCase().includes(country.toLowerCase())))
    } else {
      setData([]);
    }
  }

  return (
    <LanguageContext.Consumer>
      {([lang, setLang]) => (
        <div
          className={styles.container}
        >
          <ChooseLocale setLanguage={setLang} language={lang} />
          <Form
            onSubmit={onSubmit}
          >
            {({ handleSubmit, form, values}) => (
              <form
                className={styles.form}
                onSubmit={handleSubmit}
                onChange={handleSubmit}
                autoComplete="off"
              >
                <Field
                  name="country"
                  placeholder={translate('input_placeholder', lang)}
                  component={Input}
                  type="text"
                  hideError
                  className={styles.input}
                />
              </form>
            )}
          </Form>
          <Modal
            title={modalTitle}
            withContent
            content={content}
            hideSubmitButton
            closeButtonText={translate('close', lang)}
          >
            {toggleModal => {
              return (
                <div className={styles.rowContainer}>
                  {data.map(({ name, capital, population, flag }) => (
                    <CountryRow
                      key={name}
                      name={name}
                      onClick={() => {
                        setTitle(name);
                        const countryData = (
                          <div>
                            <p><b>{translate('name', lang)}:</b> {name}</p>
                            <p><b>{translate('capital', lang)}:</b> {capital}</p>
                            <p><b>{translate('population', lang)}:</b> {population.toLocaleString()}</p>
                            <img className={styles.flag} src={flag} alt="flag" />
                          </div>
                        );
                        setContent(countryData);
                        toggleModal();
                      }}
                    />
                  ))}
                </div>
              );
            }}
          </Modal>
        </div>
      )}
    </LanguageContext.Consumer>
  );
};

CountryData.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.shape({})),
  getCountryNames: PropTypes.func,
};

export default connect(state => ({
  countries: state.entities.countries.data,
}), {
  getCountryNames: api.countries.getCountryNames,
})(CountryData);
