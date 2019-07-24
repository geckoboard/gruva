import { cloneDeep, uniqBy } from 'lodash';
import * as actions from '../actions';

const initialState = {
  loading: true,
  byMilestoneId: {},
};

const epicsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.fetchEpics.start.type:
      return {
        ...state,
        loading: true,
      };
    case actions.fetchEpics.end.type:
      return {
        ...state,
        loading: false,
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
