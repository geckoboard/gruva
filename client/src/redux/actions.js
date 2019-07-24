import { createAction, createThunk } from 'redan';
import api from '../api';

export const epicsReceived = createAction('EPICS_RECEIVED');

export const fetchMilestones = createThunk('FETCH_MILESTONES', () => () => {
  return api.milestones.get();
});

export const fetchEpics = createThunk(
  'FETCH_EPICS',
  milestoneId => dispatch => {
    const request = _keepFetching(
      next => api.epics.getForMilestone(milestoneId, next),
      res => dispatch(epicsReceived({ milestoneId, epics: res.data })),
    );

    return request;
  },
);

const _getNextToken = response => {
  if (!response.next) {
    return undefined;
  }

  return response.next.split('next=')[1];
};

const _keepFetching = (fetcher, callback, stopWhen = () => false) => {
  const recursiveFetch = response => {
    const next = _getNextToken(response);

    callback(response);

    if (!next || stopWhen(response)) {
      return;
    }

    return fetcher(next).then(recursiveFetch);
  };

  return fetcher().then(recursiveFetch);
};
