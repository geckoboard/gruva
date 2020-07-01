import * as actions from '../actions';

const getCachedMembers = () => {
  const storedJSON = localStorage.getItem(`members`);
  if (storedJSON) {
    return JSON.parse(storedJSON);
  }

  return {};
};

const initialState = {
  loading: true,
  byId: getCachedMembers(),
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
      const byId = payload.reduce((membersById, member) => {
        return {
          ...membersById,
          [member.id]: member,
        };
      }, {});

      localStorage.setItem(`members`, JSON.stringify(byId));

      return {
        ...state,
        loading: false,
        byId,
      };

    default:
      return state;
  }
};

export default membersReducer;
