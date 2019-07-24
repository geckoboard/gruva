import { cloneDeep, forEach, sortBy, uniqBy } from 'lodash';
import * as actions from '../actions';

const initialState = {
  loadingMilestoneIds: [],
  byEpicId: {},
  epicless: [],
};

const storiesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.fetchStories.start.type:
      return {
        ...state,
        loadingMilestoneIds: [...state.loadingMilestoneIds, payload],
      };
    case actions.fetchStories.end.type:
      const loadingIds = [...state.loadingMilestoneIds];
      var index = loadingIds.indexOf(payload);
      if (index !== -1) loadingIds.splice(index, 1);

      return {
        ...state,
        loadingMilestoneIds: loadingIds,
      };
    case actions.storiesReceived.type:
      const { stories } = payload;
      const epics = cloneDeep(state.byEpicId);
      const epicless = cloneDeep(state.epicless);

      stories.forEach(story => {
        const { epic_id: epicId } = story;
        if (epicId) {
          if (!epics[epicId]) {
            epics[epicId] = [];
          }

          // Add stories to front of array to keep newest data at the front
          // because uniqBy will keep the first items with uniq keys.
          epics[epicId].unshift({
            ...story,
            id: story.id.toString(),
          });
        } else {
          // In case some stories don't have an epic. Not sure this
          // is possible when fetching by milestone?
          epicless.push({
            ...story,
            id: story.id.toString(),
          });
        }
      });

      const byEpicId = {};
      forEach(epics, (epic, id) => {
        byEpicId[id] = sortBy(uniqBy(epics[id], 'id'), 'name');
      });

      return {
        ...state,
        byEpicId,
        epicless: uniqBy(epicless, 'id'),
      };
    default:
      return state;
  }
};

export default storiesReducer;
