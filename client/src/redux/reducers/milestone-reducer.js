import * as actions from '../actions';

const initialState = {
  loading: true,
  entities: [],
  numberOfStories: {},
};

const milestonesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.setNumberOfStories.type:
      return {
        ...state,
        numberOfStories: {
          ...state.numberOfStories,
          [payload.milestoneId]: payload.count,
        },
      };
    case actions.fetchMilestones.start.type:
      return {
        ...state,
        loading: true,
        entities: [],
      };

    case actions.fetchMilestones.end.type:
      return {
        ...state,
        loading: false,
        entities: payload.map(milestone => ({
          ...milestone,
          id: milestone.id.toString(),
        })),
      };
    default:
      return state;
  }
};

export default milestonesReducer;
