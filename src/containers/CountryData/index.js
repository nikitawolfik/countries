import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import Transition from 'react-transition-group/Transition';
import cx from 'classnames';

import { api } from 'redux/actions';
import { Modal, Input, ChooseLocale, CountryRow } from 'components';
import { LanguageContext } from 'context';
import { translate } from 'utils/translation';

import styles from './styles.module.scss';


const CountryData = ({ countries, getCountryNames }) => {
  const [data, setData] = React.useState(countries);
  const [modalTitle, setTitle] = React.useState('');
  const [content, setContent] = React.useState(null);
  const [showList, setShowList] = React.useState(false);

  React.useEffect(() => {
    getCountryNames();
  }, []);

  const onSubmit = ({ country }) => {
    if (country) {
      setData(countries.filter(c => c.name.toLowerCase().includes(country.toLowerCase())))
      setShowList(true);
    } else {
      setData(countries);
      setShowList(false);
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
            {toggleModal => (
              <Transition
                in={showList}
                timeout={350}
                unmountOnExit
                mountOnEnter
                enter
              >
                {listAnimation => (
                  <div
                    className={cx(
                      styles.rowContainer,
                      {
                        [styles.entering]: listAnimation === 'entering',
                        [styles.exiting]: listAnimation === 'exiting',
                      },
                    )}
                  >
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
                              <img className={styles.flag} src={flag} alt={translate('flag', lang)} />
                            </div>
                          );
                          setContent(countryData);
                          toggleModal();
                        }}
                      />
                    ))}
                    {!data.length && (
                      <div className={styles.listEmpty}>
                        {translate('list_empty', lang)}
                      </div>
                    )}
                  </div>
                )}
              </Transition>
            )}
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
}), dispatch => ({
  getCountryNames: () => dispatch(api.countries.getCountryNames()),
}))(CountryData);
