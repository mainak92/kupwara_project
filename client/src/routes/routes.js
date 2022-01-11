// #region imports
import loadable from 'loadable-components';
// #endregion

export const UserManagement = loadable(() => import('../components/userManagement/manageUser'));
export const CreateUser = loadable(() => import('../components/userManagement/createUser'));
export const AddRelations = loadable(() => import('../components/userManagement/createRelations'));
export const LandingPage = loadable(() => import('../components/landingPage'));

