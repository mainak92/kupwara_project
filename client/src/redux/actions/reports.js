import axios from 'axios';
import store from "../../utils/store";
import { SET_REPORTS_DATA } from '../../constants/actionTypes';

const baseURL = process.env.REACT_APP_API_HOST;
const duration = parseInt(process.env.REACT_APP_NOTIFICATION_DURATION);
const successStatusCode = parseInt(process.env.REACT_APP_SUCCESS_STATUS_CODE);

export function setReportsData(content) {
  return {
    type: SET_REPORTS_DATA,
    content,
  };
}

export function updateReportsObj(obj) {
  return (dispatch) => {
    dispatch(setReportsData(obj));
  };
}


export function getReportsList(userId) {
  const config = {
    headers: { 'X-UserId': userId }
  };

  return (dispatch) => {
    return axios.get(baseURL + 'api/report-details/report-feature-list', config).then((response) => {
      if (response.data.status === successStatusCode) {
        dispatch(setReportsData({
          reportsTypeList: response.data.body || []
        }));
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function getReportsSubtypeList(masterFeatureId) {
  const st = store.getState();
  const config = {
    headers: { 'X-UserId': st.global.userId },
    params: {
      masterFeatureId
    }
  };

  return (dispatch) => {
    return axios.get(baseURL + 'api/report-details/report-sub-feature-list', config).then((response) => {
      if (response.data.status === successStatusCode) {
        dispatch(setReportsData({
          reportsSubtypeList: response.data.body || []
        }));
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function updateReportsData(userId, obj) {
  const st = store.getState();
  const config = {
    headers: { 'X-UserId': st.global.userId }
  };
  return (dispatch) => {
    return axios.put(baseURL + 'api/report-details/update-dashboardid-or-url', obj, config).then((response) => {
      return response;
    }).catch((error) => {
      console.log(error);
    });
  };
}
