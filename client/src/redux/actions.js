import { createThunk } from 'redan';
import api from '../api';

export const fetchMilestones = createThunk('FETCH_TEAMS', () => () => {
  return api.milestones.get();
});
