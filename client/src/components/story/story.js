import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './story.css';

const Story = props => {
  const { story } = props;

  const classes = classnames(styles.story, {
    [styles.done]: story.completed,
  });

  return <div className={classes}>{story.name}</div>;
};

Story.propTypes = {
  story: PropTypes.object,
};

export default Story;
