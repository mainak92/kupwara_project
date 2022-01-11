import axios from 'axios';
import { SET_CONFIGURATION_DATA } from '../../constants/actionTypes';
import { notification } from 'antd';
import intlUni from 'react-intl-universal';

const duration = parseInt(process.env.REACT_APP_NOTIFICATION_DURATION);
const baseURL = process.env.REACT_APP_API_HOST;
const successStatusCode = parseInt(process.env.REACT_APP_SUCCESS_STATUS_CODE);

export function setConfigurationData(content) {
  return {
    type: SET_CONFIGURATION_DATA,
    content,
  };
}

export function getConfigurationList() {
  return (dispatch) => {
    return axios.get(baseURL + 'api/acm/get-feature-list').then((response) => {
      if (response.data.status === successStatusCode) {
        dispatch(setConfigurationData({
          configurationList: response.data.body || []
        }));
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function updateFeatureList(obj, userId) {
  const config = {
    headers: {
      'x-userId': userId
    }
  }
  return (dispatch) => {
    return axios.put(baseURL + 'api/feature/update-feature-enablement', obj, config).then((response) => {
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

export function updatePropsData(obj) {
  return (dispatch) => {
    dispatch(setConfigurationData(obj));
  };
}

export function getFeatureConfigurationList() {
  return (dispatch) => {
    return axios.get(baseURL + 'api/feature/get-feature-enablement-list').then((response) => {
      if (response.data.status === successStatusCode) {
        dispatch(setConfigurationData({
          featureConfigurationList: response.data.body || []
        }));
      }
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