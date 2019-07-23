import { API, apiRequest, getJSON } from './utils';

const getMilestones = () => {
  return apiRequest(`${API}/milestones`).then(getJSON);
};

export { getMilestones as get };
