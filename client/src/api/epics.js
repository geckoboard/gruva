import { API, apiRequest, getClubhouseSearch, getJSON } from './utils';

export const getForMilestone = (milestoneId, next) => {
  const url = `${API}/milestones/${milestoneId}/epics`;
  return getClubhouseSearch(url, next);
};

export const get = epicId => {
  return apiRequest(`${API}/epics/${epicId}`).then(getJSON);
};
