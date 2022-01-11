import { SET_ROLE_DATA } from '../../constants/actionTypes';

const INITIAL_STATE = {
    roleList: [],
    projectRoleList: [],
    applicationPermissionList: [],
    projectRolePermissionList: [],
    activeRoleList: [],
    roleFeaturesList: [],
    homeFeaturesList: [],
    projectRoleFeatures: []
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SET_ROLE_DATA:
      return {
        ...state,
        ...action.content,
      };
    default:
      return state;
  }
};
