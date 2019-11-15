import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Button } from 'components';

import styles from './styles.module.scss';


const ChooseLocale = ({ setLanguage, language }) => (
  <div className={styles.container}>
    <Button
      title="Русский"
      onClick={() => setLanguage('ru')}
      className={cx(styles.button, {
        [styles.selected]: language === 'ru',
      })}
    />
    <Button
      title="English"
      onClick={() => setLanguage('en')}
      className={cx(styles.button, {
        [styles.selected]: language === 'en',
      })}
    />
  </div>
);

ChooseLocale.propTypes = {
  setLanguage: PropTypes.func,
  language: PropTypes.string,
};

export default ChooseLocale;
