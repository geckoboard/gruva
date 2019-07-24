import { combineReducers } from 'redux';
import milestones from './milestone-reducer';
import epics from './epics-reducer';
import stories from './stories-reducer';

export default combineReducers({ milestones, epics, stories });
