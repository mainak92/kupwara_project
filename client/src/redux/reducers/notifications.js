import { SET_NOTIFICATIONS_DATA } from '../../constants/actionTypes';

const INITIAL_STATE = {
  notificationsList: [],
  notificationList: [],
  notificationPageNumber: 0,
  notificationTotalRecords: 0,
  filterData: [],
  unreadNotificationCount: "",
  totalNotificationRecords: 0,
  loadedRecords: 0
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SET_NOTIFICATIONS_DATA:
      return {
        ...state,
        ...action.content,
      };
    default:
      return state;
  }
};
