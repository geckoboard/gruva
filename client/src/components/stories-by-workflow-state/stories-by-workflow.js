import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { find, orderBy } from 'lodash';
import Story from '../story';
import styles from './stories.css';

const sortStories = stories => {
  return orderBy(stories, 'position');
};

const getStoriesByState = (stories, workflows) => {
  return stories
    .filter(story => !story.archived)
    .reduce(
      (acc, story) => {
        const { completed, project_id, started, workflow_state_id } = story;
        const organisedStories = { ...acc };
        const states = workflows[project_id] || [];

        const state = find(states, state => state.id === workflow_state_id);

        if (started && !completed) {
          organisedStories.started.stories.push(story);
        } else if (completed) {
          organisedStories.completed.stories.push(story);
        } else if (state) {
          let currentState = find(
            organisedStories.states,
            s => s.id === state.id,
          );
          if (!currentState) {
            currentState = {
              ...state,
              stories: [],
            };

            organisedStories.states.push(currentState);
          }

          currentState.stories.push(story);
        } else {
          organisedStories.rest.stories.push(story);
        }

        return organisedStories;
      },
      {
        completed: { stories: [] },
        started: { stories: [] },
        states: [],
        rest: { stories: [] },
      },
    );
};

class StoriesByWorkflow extends Component {
  render() {
    const { isEpicDone, isLoading, stories, workflowStates } = this.props;

    if (!isLoading && !stories.length) {
      return <div>No stories for this epic</div>;
    }

    const storiesByState = getStoriesByState(stories, workflowStates);
    const startedStories = sortStories(storiesByState.started.stories);
    const completedStories = sortStories(storiesByState.completed.stories);
    const restStories = sortStories(storiesByState.rest.stories);

    const sortedStates = orderBy(storiesByState.states, 'position', 'desc');
    sortedStates.forEach(state => {
      state.sortedStories = sortStories(state.stories);
    });

    return (
      <div className={styles.stories}>
        {startedStories.length > 0 && (
          <div className={classnames(styles.storiesSection, styles.started)}>
            <h2>Started</h2>
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
        {sortedStates.map(state => {
          return (
            <div key={state.id} className={styles.storiesSection}>
              <h2>{state.name}</h2>
              {state.sortedStories.map(story => (
                <Story
                  key={story.id}
                  story={story}
                  isEpicDone={isEpicDone}
                  isLoadingStories={isLoading}
                />
              ))}
            </div>
          );
        })}
        {restStories.length > 0 && (
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
        )}
        {completedStories.length > 0 && (
          <div className={styles.storiesSection}>
            {completedStories.map(story => (
              <Story
                key={story.id}
                story={story}
                isEpicDone={isEpicDone}
                isLoadingStories={isLoading}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

StoriesByWorkflow.defaultProps = {
  stories: [],
  workflowStates: {},
};

StoriesByWorkflow.propTypes = {
  isEpicDone: PropTypes.bool,
  isLoading: PropTypes.bool,
  stories: PropTypes.array,
  workflowStates: PropTypes.object,
};

export default StoriesByWorkflow;
