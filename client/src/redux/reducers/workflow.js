import { SET_WORKFLOW_DATA } from '../../constants/actionTypes';

const INITIAL_STATE = {
  channelList: [],
  requestTypeList: [],
  subChannelList: [],
  templateTypeList: [],
  regionList: [],
  complexityList: []
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SET_WORKFLOW_DATA:
      return {
        ...state,
        ...action.content,
      };
    default:
      return state;
  }
};
