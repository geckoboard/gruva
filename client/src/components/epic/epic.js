import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Stories from '../stories';
import EpicHeader from '../epic-header/epic-header';
import styles from './epic.css';

const Epic = props => {
  const {
    epic,
    epic: { id, completed },
    milestoneId,
  } = props;

  const classes = classnames(styles.epic, {
    [styles.done]: completed,
  });

  return (
    <div className={classes}>
      <EpicHeader epic={epic} />
      <Stories epicId={id} milestoneId={milestoneId} />
    </div>
  );
};

Epic.propTypes = {
  epic: PropTypes.object,
  milestoneId: PropTypes.string,
};

export default Epic;
