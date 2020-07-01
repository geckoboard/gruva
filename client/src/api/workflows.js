import { API, apiRequest, getJSON } from './utils';

const getWorkflows = () => {
  return apiRequest(`${API}/workflows`).then(getJSON);
};

export { getWorkflows as get };
