import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

class Stories extends Component {
  render() {
    const { isEpicDone, isLoading, stories } = this.props;

    if (!isLoading && !stories.length) {
      return <div>No stories for this epic</div>;
    }

    const sortedStories = sortStories(stories);

    return (
      <div className={styles.stories}>
        {sortedStories.map(story => (
          <Story
            key={story.id}
            story={story}
            isEpicDone={isEpicDone}
            isLoadingStories={isLoading}
          />
        ))}
      </div>
    );
  }
}

Stories.defaultProps = {
  stories: [],
};

Stories.propTypes = {
  isEpicDone: PropTypes.bool,
  isLoading: PropTypes.bool,
  stories: PropTypes.array,
};

export default Stories;
