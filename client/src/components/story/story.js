import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import styles from './story.css';

const getStoryTypeIcon = story => {
  switch (story.story_type) {
    case 'bug':
      return icons.faBug;
    case 'chore':
      return icons.faWrench;
    default:
      return icons.faCertificate;
  }
};

const getIcons = story => {
  const storyIcons = [];

  if (!story.completed && story.blocked) {
    storyIcons.push(icons.faMinusCircle);
  }

  // Completed or doing
  if (story.completed) {
    storyIcons.push(icons.faCheck);
  } else if (story.started) {
    storyIcons.push(icons.faPaperPlane);
  }

  return storyIcons;
};

const Story = props => {
  const {
    doneVisible,
    story,
    story: { id, app_url: storyHref, completed, name, story_type: storyType },
  } = props;

  const classes = classnames(styles.story, styles.clubhouseStyle, {
    [styles.done]: completed,
    [styles.hideDone]: completed && !doneVisible,
    [styles.bug]: storyType === 'bug',
    [styles.chore]: storyType === 'chore',
  });

  const storyIcons = getIcons(story);
  const storyTypeIcon = getStoryTypeIcon(story);
  const typeIconClasses = classnames(
    styles.typeIcon,
    styles[`icon-${storyTypeIcon.iconName}`],
  );

  return (
    <div className={classes}>
      <h3 className={styles.name}>{name}</h3>
      <footer className={styles.footer}>
        <a href={storyHref} target="_blank" className={styles.storyLink}>
          <span className={typeIconClasses}>
            <FontAwesomeIcon icon={storyTypeIcon} />
          </span>
          {id}
        </a>
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
      </footer>
    </div>
  );
};

Story.propTypes = {
  doneVisible: PropTypes.bool,
  story: PropTypes.object,
};

export default Story;
