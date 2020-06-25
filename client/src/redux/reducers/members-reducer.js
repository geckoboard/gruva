import * as actions from '../actions';

const initialState = {
  loading: true,
  byId: {},
};

const membersReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.fetchMembers.start.type:
      return {
        ...state,
        loading: true,
        byId: {},
      };

    case actions.fetchMembers.end.type:
      return {
        ...state,
        loading: false,
        byId: payload.reduce((membersById, member) => {
          return {
            ...membersById,
            [member.id]: member,
          };
        }, {}),
      };

    default:
      return state;
  }
};

export default membersReducer;
