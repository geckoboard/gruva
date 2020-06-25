import { combineReducers } from 'redux';
import epics from './epics-reducer';
import global from './global-reducer';
import members from './members-reducer';
import milestones from './milestone-reducer';
import stories from './stories-reducer';

export default combineReducers({ epics, global, members, milestones, stories });
