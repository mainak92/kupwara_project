import { combineReducers } from 'redux';
import global from './reducers/global';
import role from './reducers/role';
import user from './reducers/user';
import configure from './reducers/configuration';
import newProject from './reducers/newProject';
import notifications from './reducers/notifications';
import claimProjects from './reducers/claimProject';
import workflow from './reducers/workflow';
import reports from './reducers/reports';
import mySheets from './reducers/mySheets';

const rootReducer = combineReducers({
	global,
	role,
	user,
	configure,
	newProject,
	notifications,
	claimProjects,
	workflow,
	reports,
	mySheets
});

export default rootReducer;
