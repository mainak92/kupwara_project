import { SET_GLOBAL_DATA } from '../../constants/actionTypes';

const INITIAL_STATE = {
  userId: 0,
  userName: '',
  userRole: '',
  preferredUserName: '',
  emailId: '',
  keycloak: {},
  collapsed: false,
  locale: 'en',
  languageList: []
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SET_GLOBAL_DATA:
      return {
        ...state,
        ...action.content,
      };
    default:
      return state;
  }
};
