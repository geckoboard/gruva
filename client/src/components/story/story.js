import React from 'react';
import PropTypes from 'prop-types';
import styles from './story.css';

const Story = (props) => {
  const { story } = props;
  return (
    <div className={styles.story}>
      {story.name}
    </div>
  );
};

Story.propTypes = {
  story: PropTypes.object,
};

export default Story;
