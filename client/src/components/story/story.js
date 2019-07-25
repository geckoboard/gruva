import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import styles from './story.css';

const getIcon = story => {
  if (story.started && !story.completed) {
    return icons.faTruck;
  }

  if (story.blocked) {
    return icons.faMinusCircle;
  }

  return;
};

const Story = props => {
  const { story } = props;

  const classes = classnames(styles.story, {
    [styles.done]: story.completed,
  });
  const icon = getIcon(story);

  return (
    <div className={classes}>
      <h3 className={styles.name}>{story.name}</h3>
      {icon && (
        <div className={styles.icon}>
          <FontAwesomeIcon icon={getIcon(story)} />
        </div>
      )}
    </div>
  );
};

Story.propTypes = {
  story: PropTypes.object,
};

export default Story;
