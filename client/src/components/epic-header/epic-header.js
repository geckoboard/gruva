import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import * as icons from '@fortawesome/free-regular-svg-icons';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import styles from './epic-header.css';

const getIcon = epic => {
  const { completed, started } = epic;

  if (completed) {
    return solidIcons.faCheck;
  }

  if (started) {
    return solidIcons.faPaperPlane;
  }

  return icons.faStickyNote;
};

const EpicHeader = props => {
  const {
    epic,
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
  const icon = getIcon(epic);
  const iconClasses = classnames(
    styles.titleIcon,
    styles[`icon-${icon.iconName}`],
  );

  return (
    <div className={styles.epicHeader}>
      <h2 className={styles.name}>
        <span className={iconClasses}>
          <FontAwesomeIcon icon={icon} />
        </span>{' '}
        {name}
      </h2>
      <div className={styles.epicStats}>
        <div className={styles.done}>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={solidIcons.faCheck} />
          </span>
          {numStoriesDone} / {numStories} stories
        </div>
        {!!numStoriesStarted && (
          <div className={styles.doing}>
            <span className={styles.icon}>
              <FontAwesomeIcon icon={solidIcons.faPaperPlane} />
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
