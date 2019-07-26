import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useDrop } from 'react-dnd';
import Stories from '../stories';
import EpicHeader from '../epic-header/epic-header';
import styles from './epic.css';

const Epic = props => {
  const {
    epic,
    epic: { id, completed, started },
    milestoneId,
  } = props;

  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: 'STORY',
    drop: () => {
      return { epicId: id };
    },
    canDrop: item => {
      return item.epicId !== id;
    },
    collect: mon => ({
      canDrop: !!mon.canDrop(),
      isOver: !!mon.isOver(),
    }),
  });

  const classes = classnames(styles.epic, {
    [styles.done]: completed,
    [styles.doing]: !completed && started,
    [styles.todo]: !completed && !started,
  });

  const storiesClasses = classnames(styles.stories, {
    [styles.isOver]: isOver && canDrop,
  });

  return (
    <div className={classes}>
      <EpicHeader epic={epic} />
      <div ref={dropRef} className={storiesClasses}>
        <Stories epicId={id} milestoneId={milestoneId} isEpicDone={completed} />
      </div>
    </div>
  );
};

Epic.propTypes = {
  epic: PropTypes.object,
  milestoneId: PropTypes.string,
};

export default Epic;
