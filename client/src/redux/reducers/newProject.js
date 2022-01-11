import { SET_NEW_PROJECT_DATA } from '../../constants/actionTypes';

const INITIAL_STATE = {
  channelList: [],
  requestTypeList: [],
  subChannelList: [],
  templateTypeList: [],
  operatingModelList: []
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SET_NEW_PROJECT_DATA:
      return {
        ...state,
        ...action.content,
      };
    default:
      return state;
  }
};
