import { cloneDeep, forEach, remove, sortBy, uniqBy } from 'lodash';
import * as actions from '../actions';

const getCachedStories = () => {
  const storedJSON = localStorage.getItem(`stories`);
  if (storedJSON) {
    return JSON.parse(storedJSON);
  }

  return {};
};

const initialState = {
  loadingMilestoneIds: [],
  byEpicId: getCachedStories(),
  epicless: [],
  doneVisible: false,
};

const storiesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.setStoryEpicId.type:
      const { storyId, previousEpicId, newEpicId } = payload;
      const currentEpic = [...state.byEpicId[previousEpicId]];

      const [storyToMove] = remove(currentEpic, story => story.id === storyId);

      const newbyEpicsId = {
        ...state.byEpicId,
        [previousEpicId]: currentEpic,
        [newEpicId]: [
          ...state.byEpicId[newEpicId],
          { ...storyToMove, epic_id: parseInt(newEpicId, 10) },
        ],
      };

      localStorage.setItem(`stories`, JSON.stringify(newbyEpicsId));

      return {
        ...state,
        byEpicId: newbyEpicsId,
      };

    case actions.toggleDoneStoriesVisibility.type:
      return {
        ...state,
        doneVisible: !state.doneVisible,
      };
    case actions.fetchStories.start.type:
      return {
        ...state,
        loadingMilestoneIds: [...state.loadingMilestoneIds, payload],
      };
    case actions.fetchStories.end.type:
      const loadingIds = [...state.loadingMilestoneIds];
      var index = loadingIds.indexOf(payload);
      if (index !== -1) loadingIds.splice(index, 1);

      localStorage.setItem(`stories`, JSON.stringify(state.byEpicId));

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
