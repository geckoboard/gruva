import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Story from '../story';
import styles from './stories.css';

class Stories extends Component {
  render() {
    const { isLoading, stories } = this.props;

    if (!isLoading && !stories.length) {
      return <div>No stories for this epic</div>;
    }

    return (
      <div className={styles.stories}>
        <h5>Stories</h5>
        {isLoading && <div>Loading stories...</div>}
        {stories.map(story => (
          <Story key={story.id} story={story} />
        ))}
      </div>
    );
  }
}

Stories.defaultProps = {
  stories: [],
};

Stories.propTypes = {
  isLoading: PropTypes.bool,
  stories: PropTypes.array,
};

export default Stories;
