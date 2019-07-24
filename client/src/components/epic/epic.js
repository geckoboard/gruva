import React from 'react';
import PropTypes from 'prop-types';
import Stories from '../stories';
import styles from './epic.css';

const Epic = props => {
  const {
    epic: { id, name },
    milestoneId,
  } = props;

  return (
    <div className={styles.epic}>
      <h4 key={id}>{name}</h4>
      <Stories epicId={id} milestoneId={milestoneId} />
    </div>
  );
};

Epic.propTypes = {
  epic: PropTypes.object,
  milestoneId: PropTypes.string,
};

export default Epic;
