import React from 'react';
import PropTypes from 'prop-types';
import styles from './epic-header.css';

const EpicHeader = props => {
  const {
    epic: { id, name },
  } = props;
  return (
    <div className={styles.epicHeader}>
      <h4 className={styles.name}>{name}</h4>
    </div>
  );
};

EpicHeader.propTypes = {
  epic: PropTypes.object,
};

export default EpicHeader;
