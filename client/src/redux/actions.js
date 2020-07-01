import { createAction, createThunk } from 'redan';
import api from '../api';

export const setCurrentPage = createAction('SET_CURRENT_PAGE');

export const toggleDoneStoriesVisibility = createAction('DONE_STORES_VISIBLE');
export const setNumberOfStories = createAction('SET_NO_STORIES');
export const setStoryEpicId = createAction('SET_STORY_EPIC_ID');

export const epicsReceived = createAction('EPICS_RECEIVED');
export const storiesReceived = createAction('STORIES_RECEIVED');
export const workflowsReceived = createAction('WORFKLOWS_RECEIVED');

export const fetchMilestones = createThunk('FETCH_MILESTONES', () => () => {
  return api.milestones.get();
});

export const fetchEpic = createThunk('FETCH_EPIC', epicId => () => {
  return api.epics.get(epicId);
});

export const fetchEpics = createThunk(
  'FETCH_EPICS',
  milestoneId => dispatch => {
    const request = _keepFetching(
      next => api.epics.getForMilestone(milestoneId, next),
      res => dispatch(epicsReceived({ milestoneId, epics: res.data })),
    );

    return request.then(() => milestoneId);
  },
);

export const fetchMembers = createThunk('FETCH_MEMBERS', () => () =>
  api.members.get(),
);

// For some reason this would sometimes return 204 for the server??
// export const fetchWorkflows = createThunk('FETCH_WORKFLOWS', () => () => {
//   console.log('dwaodiod');
//   return api.workflows.get();
// });
export const fetchWorkflows = () => dispatch => {
  api.workflows
    .get()
    .then(res => {
      dispatch(workflowsReceived(res));
    })
    .catch(err => console.log('err', err));
};

export const fetchStories = createThunk(
  'FETCH_STORIES',
  milestoneId => dispatch => {
    const request = _keepFetching(
      next => api.stories.getForMilestone(milestoneId, next),
      res => {
        dispatch(storiesReceived({ milestoneId, stories: res.data }));
        // dispatch(setNumberOfStories({ milestoneId, count: res.total }));
      },
    );

    return request.then(() => milestoneId);
  },
);

export const updateStoryEpicId = createThunk(
  'UPDATE_EPIC_ID',
  payload => dispatch => {
    const { storyId, previousEpicId, newEpicId } = payload;
    dispatch(setStoryEpicId(payload));

    // TODO: Revert back if update errors

    return api.stories.update(storyId, { epic_id: newEpicId }).then(story => {
      dispatch(fetchEpic(previousEpicId));
      dispatch(fetchEpic(newEpicId));
      return story;
    });
  },
);

const _getNextToken = response => {
  if (!response.next) {
    return undefined;
  }

  return response.next.split('next=')[1];
};

const _keepFetching = (fetcher, callback, stopWhen = () => false) => {
  const recursiveFetch = response => {
    const next = _getNextToken(response);

    callback(response);

    if (!next || stopWhen(response)) {
      return;
    }

    return fetcher(next).then(recursiveFetch);
  };

  return fetcher().then(recursiveFetch);
};
