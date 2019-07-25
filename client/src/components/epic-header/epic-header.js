import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import styles from './epic-header.css';

const EpicHeader = props => {
  const {
    epic: {
      name,
      stats: {
        num_stories_unstarted: numStoriesUnstarted,
        num_stories_started: numStoriesStarted,
        num_stories_done: numStoriesDone,
      },
    },
  } = props;

  const numStories = numStoriesUnstarted + numStoriesStarted + numStoriesDone;

  return (
    <div className={styles.epicHeader}>
      <h2 className={styles.name}>{name}</h2>
      <div className={styles.epicStats}>
        <div className={styles.done}>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={icons.faCheck} />
          </span>
          {numStoriesDone} / {numStories} stories
        </div>
        {!!numStoriesStarted && (
          <div className={styles.doing}>
            <span className={styles.icon}>
              <FontAwesomeIcon icon={icons.faTruck} />
            </span>
            {numStoriesStarted}
          </div>
        )}
      </div>
    </div>
  );
};

EpicHeader.propTypes = {
  epic: PropTypes.object,
};

export default EpicHeader;
