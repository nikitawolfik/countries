import React from 'react';
import PropTypes from 'prop-types';


import styles from './styles.module.scss';


const CountryRow = ({ name, onClick }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      {name}
    </div>
  );
};

CountryRow.propTypes = {
  
};

export default CountryRow;
