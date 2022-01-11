import { SET_REPORTS_DATA } from '../../constants/actionTypes';

const INITIAL_STATE = {
  reportsTypeList: [],
  reportsSubtypeList: []
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SET_REPORTS_DATA:
      return {
        ...state,
        ...action.content,
      };
    default:
      return state;
  }
};
