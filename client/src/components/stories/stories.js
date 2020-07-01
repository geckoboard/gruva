import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { orderBy } from 'lodash';
import Story from '../story';
import styles from './stories.css';

const sortStories = stories => {
  // Show started first, completed last. Then ordered by position.
  return orderBy(
    stories.filter(story => !story.archived),
    ['completed', 'started', 'position'],
    ['asc', 'desc', 'asc'],
  );
};

const splitStories = stories => {
  return stories.reduce(
    (acc, story) => {
      const allStories = { ...acc };
      if (story.started && !story.completed) {
        allStories.started.push(story);
      } else {
        allStories.rest.push(story);
      }

      return allStories;
    },
    {
      started: [],
      rest: [],
    },
  );
};

class Stories extends Component {
  render() {
    const { isEpicDone, isLoading, stories } = this.props;

    if (!isLoading && !stories.length) {
      return <div>No stories for this epic</div>;
    }

    const storiesByType = splitStories(stories);
    const startedStories = sortStories(storiesByType.started);
    const restStories = sortStories(storiesByType.rest);

    return (
      <div className={styles.stories}>
        {startedStories.length > 0 && (
          <div className={classnames(styles.storiesSection, styles.started)}>
            {startedStories.map(story => (
              <Story
                key={story.id}
                story={story}
                isEpicDone={isEpicDone}
                isLoadingStories={isLoading}
              />
            ))}
          </div>
        )}
        <div className={styles.storiesSection}>
          {restStories.map(story => (
            <Story
              key={story.id}
              story={story}
              isEpicDone={isEpicDone}
              isLoadingStories={isLoading}
            />
          ))}
        </div>
      </div>
    );
  }
}

Stories.defaultProps = {
  stories: [],
  workflowStates: {},
};

Stories.propTypes = {
  isEpicDone: PropTypes.bool,
  isLoading: PropTypes.bool,
  stories: PropTypes.array,
};

export default Stories;
