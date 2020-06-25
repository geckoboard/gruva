import { API, apiRequest, getJSON } from './utils';

const getMembers = () => apiRequest(`${API}/members`).then(getJSON);

export { getMembers as get };
