import axios from 'axios';
import { SET_GLOBAL_DATA } from '../../constants/actionTypes';
import { notification } from 'antd';

const baseURL = process.env.REACT_APP_API_HOST;
const successStatusCode = parseInt(process.env.REACT_APP_SUCCESS_STATUS_CODE);
const duration = parseInt(process.env.REACT_APP_NOTIFICATION_DURATION);

export function setGlobalData(content) {
  return {
    type: SET_GLOBAL_DATA,
    content,
  };
}

export function getLanguageList() {
  const config = {
    headers: { locale: 'en' }
  };
  return (dispatch) => {
    return axios.get(baseURL + 'api/notification/get-notification-language-list', config).then((response) => {
      if (response.data.status === successStatusCode) {
        dispatch(setGlobalData({
          languageList: response.data.body
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
    });
  };
}

export function getUserInfo(email) {
  const config = {
    headers: { email: email }
  };
  return (dispatch) => {
    return axios.get(baseURL + 'api/user/single-user', config).then((response) => {
      if (response.data.status === successStatusCode) {
        dispatch(setGlobalData({
          userId: response.data.body.id,
          userName: response.data.body.userName,
          userRole: response.data.body.userRole,
          preferredUserName: response.data.body.preferredUserName
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
    });
  };
}

export function updateUserInfo(obj, keycloak) {
  return (dispatch) => {
    dispatch(setGlobalData({
      emailId: obj.email,
      keycloak: keycloak,
      preferredUserName: obj.preferred_username
    }));
  };
}

export function updateGlobalData(obj) {
  return (dispatch) => {
    dispatch(setGlobalData(obj));
  };
}
