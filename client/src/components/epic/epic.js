import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Stories from '../stories';
import EpicHeader from '../epic-header/epic-header';
import styles from './epic.css';

const Epic = props => {
  const {
    epic,
    epic: { id, completed, started },
    milestoneId,
  } = props;

  const classes = classnames(styles.epic, {
    [styles.done]: completed,
    [styles.doing]: !completed && started,
    [styles.todo]: !completed && !started,
  });

  return (
    <div className={classes}>
      <EpicHeader epic={epic} />
      <Stories epicId={id} milestoneId={milestoneId} isEpicDone={completed} />
    </div>
  );
};

Epic.propTypes = {
  epic: PropTypes.object,
  milestoneId: PropTypes.string,
};

export default Epic;
