import { API, apiRequest, getJSON } from './utils';

const getMilestones = () => apiRequest(`${API}/milestones`).then(getJSON);

export { getMilestones as get };
