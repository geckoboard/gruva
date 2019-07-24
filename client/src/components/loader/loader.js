import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import styles from './loader.css';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <FontAwesomeIcon icon={icons.faSpinner} spin />
    </div>
  );
};

export default Loader;
