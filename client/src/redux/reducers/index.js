import { combineReducers } from 'redux';
import milestones from './milestone-reducer';
import epics from './epics-reducer';

export default combineReducers({ milestones, epics });
