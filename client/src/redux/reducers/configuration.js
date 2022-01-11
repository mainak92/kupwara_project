import { SET_CONFIGURATION_DATA } from '../../constants/actionTypes';

const INITIAL_STATE = {
  configurationList: [],
  featureConfigurationList: []
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SET_CONFIGURATION_DATA:
      return {
        ...state,
        ...action.content,
      };
    default:
      return state;
  }
};
