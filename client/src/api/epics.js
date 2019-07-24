import { API, getClubhouseSearch } from './utils';

export const getForMilestone = (milestoneId, next) => {
  const url = `${API}/milestones/${milestoneId}/epics`;
  return getClubhouseSearch(url, next);
};
