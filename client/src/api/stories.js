import { API, apiRequest, getClubhouseSearch, getJSON } from './utils';

export const getForMilestone = (milestoneId, next) => {
  const url = `${API}/milestones/${milestoneId}/stories`;
  return getClubhouseSearch(url, next);
};

export const update = (storyId, body = '') => {
  const url = `${API}/stories/${storyId}/update`;
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  return apiRequest(url, options).then(getJSON);
};
