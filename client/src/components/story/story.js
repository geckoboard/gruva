import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useDrag } from 'react-dnd';
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

const getInitials = name => {
  return name
    .split(' ')
    .map(n => n.slice(0, 1).toUpperCase())
    .join('');
};

const renderOwners = owners => {
  return owners.map(owner => {
    const {
      id,
      profile: { name, display_icon: displayIcon },
    } = owner;
    if (displayIcon) {
      return (
        <li key={id}>
          <img src={displayIcon.url} alt={name} />
        </li>
      );
    }
    return <li key={owner.id}>{getInitials(name)}</li>;
  });
};

const renderLabels = labels => {
  return labels.map(label => {
    return (
      <li key={label.id} style={{ background: label.color }}>
        {label.name}
      </li>
    );
  });
};

const Story = props => {
  const {
    doneVisible,
    isLoadingStories,
    owners,
    setEpicId,
    story,
    story: {
      id,
      app_url: storyHref,
      completed,
      name,
      story_type: storyType,
      labels = [],
    },
  } = props;

  const [{ canDrag, isDragging }, dragRef] = useDrag({
    item: { type: 'STORY', id, epicId: story.epic_id.toString() },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      canDrag: !!monitor.canDrag(),
    }),
    canDrag: () => !isLoadingStories,
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        const { epicId } = monitor.getDropResult();
        if (epicId !== story.epic_id.toString()) {
          setEpicId(epicId);
        }
      }
    },
  });

  const classes = classnames(styles.story, styles.clubhouseStyle, {
    [styles.done]: completed,
    [styles.hideDone]: completed && !doneVisible,
    [styles.bug]: storyType === 'bug',
    [styles.chore]: storyType === 'chore',
    [styles.isDragging]: isDragging,
    [styles.canDrag]: canDrag,
  });

  const storyIcons = getIcons(story);
  const storyTypeIcon = getStoryTypeIcon(story);
  const typeIconClasses = classnames(
    styles.typeIcon,
    styles[`icon-${storyTypeIcon.iconName}`],
  );

  return (
    <div ref={dragRef} className={classes}>
      <h3 className={styles.name}>{name}</h3>
      <footer className={styles.footer}>
        {labels.length > 0 && (
          <div className={styles.upperFooter}>
            <ul className={styles.labels}>{renderLabels(labels)}</ul>
          </div>
        )}

        <div className={styles.lowerFooter}>
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
          {!completed && (
            <ul className={styles.owners}>{renderOwners(owners)}</ul>
          )}
        </div>
      </footer>
    </div>
  );
};

Story.defaultProps = {
  owners: [],
};

Story.propTypes = {
  doneVisible: PropTypes.bool,
  isLoadingStories: PropTypes.bool,
  owners: PropTypes.array,
  story: PropTypes.object,
  setEpicId: PropTypes.func,
};

export default Story;
