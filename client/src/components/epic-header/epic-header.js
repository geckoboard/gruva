import React from 'react';
import PropTypes from 'prop-types';
import styles from './epic-header.css';

const EpicHeader = props => {
  const {
    epic: { id, name },
  } = props;
  return (
    <div className={styles.epicHeader}>
      <h2 className={styles.name}>{name}</h2>
    </div>
  );
};

EpicHeader.propTypes = {
  epic: PropTypes.object,
};

export default EpicHeader;
