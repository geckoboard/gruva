import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import styles from './story.css';

const getIcons = story => {
  const storyIcons = [];

  // Feature, bug, chore
  switch (story.story_type) {
    case 'bug':
      storyIcons.push(icons.faBug);
      break;
    case 'chore':
      storyIcons.push(icons.faWrench);
      break;
    default:
      storyIcons.push(icons.faCertificate);
      break;
  }

  // Completed or doing
  if (story.completed) {
    storyIcons.push(icons.faCheck);
  } else if (story.started) {
    storyIcons.push(icons.faPaperPlane);
  }

  if (!story.completed && story.blocked) {
    storyIcons.push(icons.faMinusCircle);
  }

  return storyIcons;
};

const Story = props => {
  const {
    doneVisible,
    story,
    story: { completed, name, story_type: storyType },
  } = props;

  const classes = classnames(styles.story, styles.clubhouseStyle, {
    [styles.done]: completed,
    [styles.hideDone]: completed && !doneVisible,
    [styles.bug]: storyType === 'bug',
    [styles.chore]: storyType === 'chore',
  });

  const storyIcons = getIcons(story);

  return (
    <div className={classes}>
      <h3 className={styles.name}>{name}</h3>
      <div className={styles.icons}>
        {storyIcons.map(icon => {
          const iconClasses = classnames(
            styles.icon,
            styles[`icon-${icon.iconName}`],
          );
          return (
            <div key={icon.iconName} className={iconClasses}>
              <FontAwesomeIcon icon={icon} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

Story.propTypes = {
  doneVisible: PropTypes.bool,
  story: PropTypes.object,
};

export default Story;
