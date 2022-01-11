import axios from 'axios';
import store from "../../utils/store";
import { SET_NOTIFICATIONS_DATA } from '../../constants/actionTypes';
import { notification } from 'antd';
import intlUni from 'react-intl-universal';
const baseURL = process.env.REACT_APP_API_HOST;
const successStatusCode = parseInt(process.env.REACT_APP_SUCCESS_STATUS_CODE);
const duration = parseInt(process.env.REACT_APP_NOTIFICATION_DURATION);

export function setNotificationsData(content) {
  return {
    type: SET_NOTIFICATIONS_DATA,
    content,
  };
}

export function getNotificationManagementList(obj) {
  const config = {
    headers: { 'locale': 'en' }
  };

  const url = '?language=' + `${obj.language}` + '&appLocale=' + `${obj.appLocale}`;

  return (dispatch) => {
    return axios.get(baseURL + 'api/notification/get-notification-list' + url, config).then((response) => {
      if (response.data.status === successStatusCode) {
        dispatch(setNotificationsData({
          notificationsList: response.data.body.notificationCategoryDTOList
        }));
      } else {
        notification.error({
          message: 'Error',
          description: response.data.message,
          duration
        });
      }
    }).catch((error) => {
      console.log(error);
      return false;
    });
  };
}

export function updateNotificationRoles(userId, obj) {
  const config = {
    headers: {
      'locale': 'en',
      'X-UserId': userId
    }
  }
  return (dispatch) => {
    return axios.post(baseURL + 'api/notification/update-notification-role-list', obj, config).then((response) => {
      return response;
    }).catch((error) => {
      console.log(error);
    });
  };
}


export function updateNotificationMessage(userId, obj) {
  const config = {
    headers: {
      'locale': 'en',
      'X-UserId': userId
    }
  }
  return (dispatch) => {
    return axios.post(baseURL + 'api/notification/update-notification-message', obj, config).then((response) => {
      return response;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function updateNotificationStatus(userId, obj, locale) {
  const config = {
    headers: {
      'locale': locale,
      'X-UserId': userId
    }
  }
  return (dispatch) => {
    return axios.post(baseURL + 'api/notification/update-notification-status', obj, config).then((response) => {
      return response;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function makeNotificationsRead(notificationIds) {
	const st = store.getState();
	const obj = {
		"notificationId": notificationIds,
		"userId": st.global.userId
	}
	return (dispatch) => {
		return axios.post(baseURL + 'api/notification/user-app-notifications-mark-read', obj).then((response) => {
			if (response.data.status === successStatusCode) {
				return true;
			} else {
				notification.error({
					message: 'Error',
					description: response.data.message,
					duration
				});
			}
			return response;
		}).catch((error) => {
			notification.error({
				message: 'Error',
				description: intlUni.get('something.went.wrong'),
				duration
			});
			console.log(error);
			return false;
		});
	};
}

export function getUnreadNotificationCount(categoryIds, searchKeyWord) {
	const st = store.getState();
	const obj = {
		"categoryId": categoryIds,
		"loadedRecords": 0,
		"locale": st.global.locale,
		"roleId": 0,
		"searchKey": searchKeyWord,
		"userId": st.global.userId
	}
	return (dispatch) => {
		return axios.post(baseURL + 'api/notification/user-app-unread-count', obj).then((response) => {
			if (response.data.status === successStatusCode) {
				return response.data.body;
			} else {
				notification.error({
					message: 'Error',
					description: response.data.message,
					duration
				});
			}
			return response;
		}).catch((error) => {
			notification.error({
				message: 'Error',
				description: intlUni.get('something.went.wrong'),
				duration
			});
			console.log(error);
			return false;
		});
	};
}

export function getFilterCount(locale) {
	const config = {
		headers: {locale}
	};
	return (dispatch) => {
		return axios.get(baseURL + 'api/notification/configuration-list', config).then((response) => {
			if (response.data.status === successStatusCode) {
				dispatch(setNotificationsData({
					filterData: response.data.body
				}));
			} else {
				notification.error({
					message: 'Error',
					description: response.data.message,
					duration
				});
			}
			return response;
		}).catch((error) => {
			notification.error({
				message: 'Error',
				description: intlUni.get('something.went.wrong'),
				duration
			});
			console.log(error);
			return false;
		});
	};
}

export function getNotificationsList(categoryIds, searchKeyWord, loadedRecords = 0) {
	const st = store.getState();
	const obj = {
		"categoryId": categoryIds,
		"loadedRecords": loadedRecords,
		"locale": st.global.locale,
		"roleId": 0,
		"searchKey": searchKeyWord,
		"userId": st.global.userId
	}
	return (dispatch) => {
		return axios.post(baseURL + 'api/notification/user-app-notifications', obj).then((response) => {
			if (response.data.status === successStatusCode) {
				dispatch(setNotificationsData({
					notificationList: response.data.body.appUserNotificationDTO,
					totalNotificationRecords: response.data.body.totalRecords,
					loadedRecords: response.data.body.loadedRecords
				}));
			} else {
				notification.error({
					message: 'Error',
					description: response.data.message,
					duration
				});
			}
			return response;
		}).catch((error) => {
			notification.error({
				message: 'Error',
				description: intlUni.get('something.went.wrong'),
				duration
			});
			console.log(error);
			return false;
		});
	};
}

export function updateNotificationData(obj) {
	return (dispatch) => {
		dispatch(setNotificationsData(obj));
	};
}
