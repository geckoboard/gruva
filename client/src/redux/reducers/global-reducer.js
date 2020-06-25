import * as actions from '../actions';

const initialState = {
  currentPage: 'overview',
};

const globalReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.setCurrentPage.type:
      return {
        ...state,
        currentPage: payload,
      };
    default:
      return state;
  }
};

export default globalReducer;
