import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-regular-svg-icons';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import styles from './milestone-stats.css';

const MilestoneStats = props => {
  const { epics } = props;

  let doneStories = 0;
  let allStories = 0;
  epics.forEach(epic => {
    const {
      stats: {
        num_stories_unstarted: numStoriesUnstarted,
        num_stories_started: numStoriesStarted,
        num_stories_done: numStoriesDone,
      },
    } = epic;

    doneStories += numStoriesDone;
    allStories += numStoriesUnstarted + numStoriesStarted + numStoriesDone;
  });

  const percentDone = doneStories / allStories;

  return (
    <div className={styles.container}>
      <div className={styles.stat}>
        <span className={styles.icon}>
          {' '}
          <FontAwesomeIcon icon={icons.faFileAlt} />
        </span>
        {allStories} stories
      </div>

      <div className={styles.stat}>
        <span className={styles.icon}>
          {' '}
          <FontAwesomeIcon icon={solidIcons.faCheck} />
        </span>
        {doneStories} done ( {Math.round(percentDone * 100)}%)
      </div>
    </div>
  );
};

MilestoneStats.defaultProps = {
  epics: [],
};

MilestoneStats.propTypes = {
  epics: PropTypes.array,
  id: PropTypes.string,
};

export default MilestoneStats;
