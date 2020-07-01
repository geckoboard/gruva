import * as actions from '../actions';

const getCachedWorkflows = () => {
  const storedJSON = localStorage.getItem(`workflows`);
  if (storedJSON) {
    return JSON.parse(storedJSON);
  }

  return [];
};

const sortWorkflowsByProject = workflows => {
  return workflows.reduce((acc, workflow) => {
    workflow.project_ids.forEach(projectId => {
      return (acc[projectId] = workflow.states);
    });

    return acc;
  }, {});
};

const initialState = {
  loading: true,
  workflows: getCachedWorkflows,
  statesByProjectId: sortWorkflowsByProject(getCachedWorkflows()),
};

const workflowsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actions.workflowsReceived.type:
      localStorage.setItem(`workflows`, JSON.stringify(payload));

      return {
        ...state,
        workflows: payload,
        statesByProjectId: sortWorkflowsByProject(payload),
      };
    default:
      return state;
  }
};

export default workflowsReducer;
