import { cloneDeep, uniqBy } from 'lodash';
import * as actions from '../actions';

const getCachedEpics = () => {
  const storedJSON = localStorage.getItem(`epics`);
  if (storedJSON) {
    return JSON.parse(storedJSON);
  }

  return {};
};

const initialState = {
  loadingMilestoneIds: [],
  byMilestoneId: getCachedEpics(),
};

const epicsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.fetchEpics.start.type:
      return {
        ...state,
        loadingMilestoneIds: [...state.loadingMilestoneIds, payload],
      };
    case actions.fetchEpics.end.type:
      const loadingIds = [...state.loadingMilestoneIds];
      var index = loadingIds.indexOf(payload);
      if (index !== -1) loadingIds.splice(index, 1);

      localStorage.setItem(`epics`, JSON.stringify(state.byMilestoneId));

      return {
        ...state,
        loadingMilestoneIds: loadingIds,
      };
    case actions.epicsReceived.type:
      const { milestoneId, epics } = payload;
      const milestones = cloneDeep(state.byMilestoneId);
      if (!milestones[milestoneId]) {
        milestones[milestoneId] = [];
      }

      // Add epics to front of array to keep newest data at the front
      // because uniqBy will keep the first items with uniq keys.
      milestones[milestoneId].unshift(
        ...epics.map(epic => ({ ...epic, id: epic.id.toString() })),
      );
      milestones[milestoneId] = uniqBy(milestones[milestoneId], 'id');

      return {
        ...state,
        byMilestoneId: milestones,
      };
    default:
      return state;
  }
};

export default epicsReducer;
