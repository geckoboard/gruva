import { API, getClubhouseSearch } from './utils';

export const getForMilestone = (milestoneId, next) => {
  const url = `${API}/milestones/${milestoneId}/stories`;
  return getClubhouseSearch(url, next);
};
