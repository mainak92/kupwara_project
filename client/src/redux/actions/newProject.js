import axios from 'axios';
import store from "../../utils/store";
import { SET_NEW_PROJECT_DATA } from '../../constants/actionTypes';
import { notification } from 'antd';
import intlUni from 'react-intl-universal';

const baseURL = process.env.REACT_APP_API_HOST;
const successStatusCode = parseInt(process.env.REACT_APP_SUCCESS_STATUS_CODE);
const duration = parseInt(process.env.REACT_APP_NOTIFICATION_DURATION);

export function setNewProjectData(content) {
  return {
    type: SET_NEW_PROJECT_DATA,
    content,
  };
}

export function getChannelList() {
  return (dispatch) => {
    return axios.get(baseURL + 'api/project/channel-list').then((response) => {
      if (response.data.status === successStatusCode) {
        dispatch(setNewProjectData({
          channelList: response.data.body
        }));
        return response
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

export function getRequestTypeList(channelId, subChannelId = "") {
  const config = {
    params: {
      channelId,
      subChannelId
    }
  };
  return (dispatch) => {
    return axios.get(baseURL + 'api/project/requestType-list', config).then((response) => {
      if (response.data.status === successStatusCode) {
        dispatch(setNewProjectData({
          requestTypeList: response.data.body
        }));
        return response
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

export function getSubChannelList(channelId) {
  const config = {
    params: {
      channelId: channelId
    }
  };
  return (dispatch) => {
    return axios.get(baseURL + 'api/project/subChannel-list', config).then((response) => {
      if (response.data.status === successStatusCode) {
        dispatch(setNewProjectData({
          subChannelList: response.data.body
        }));
        return response;
      } else {
        // notification.error({
        // 	message: 'Error',
        // 	description: response.data.message,
        // 	duration: duration
        // });
      }
    }).catch((error) => {
      console.log(error);
      return false;
    });
  };
}

export function createRGDTemplate(obj) {
  const st = store.getState();
  const config = {
    headers: { 'X-UserId': st.global.userId }
  };
  const url = `${obj.templateType}/${obj.channel}/${obj.requestType}/${obj.subcategory ? obj.subcategory : 0}`;

  return (dispatch) => {
    return axios.post(baseURL + 'api/rgd/save-template/' + url, obj.jsonObj, config).then((response) => {
      if (response.data.status === successStatusCode) {
        return response;
      }
      else if (response.data.status === 400) {
        notification.error({
          message: 'Error',
          description: "Invalid JSON Object",
          duration
        });
      }
      return response;
    }).catch((error) => {
      notification.error({
        message: 'Error',
        description: "Invalid JSON Object",
        duration
      });
      return false;
    });
  };
}

export function downloadRGDTemplate(obj) {
  const st = store.getState();
  const config = {
    headers: { 
      'X-UserId': st.global.userId,
      'locale': st.global.locale 
  }
};

  return (dispatch) => {
    return axios.post(baseURL + 'api/rgd/download-rgd-json', obj , config).then((response) => {
      return response;
    }).catch((error) => {
      notification.error({
        message: 'Error',
        description: intlUni.get('something.went.wrong'),
        duration: NOTIFICATION_DURATION
      });
      console.log(error);
      return false;
    });
  };
}

export function previewRGDTemplate(obj) {
  const st = store.getState();
  const config = {
    headers: { 
      'X-UserId': st.global.userId,
      'locale': st.global.locale 
  }
};

  return (dispatch) => {
    return axios.post(baseURL + 'api/rgd/preview-rgd-json', obj , config).then((response) => {
      return response;
    }).catch((error) => {
      notification.error({
        message: 'Error',
        description: intlUni.get('something.went.wrong'),
        duration: NOTIFICATION_DURATION
      });
      console.log(error);
      return false;
    });
  };
}


export function createWorkflowTemplate(obj) {
  const st = store.getState();
  const config = {
    headers: { 'X-UserId': st.global.userId }
  };
  const url = `${obj.channel}/${obj.requesttype}/${obj.region.key}/${obj.complexity}/${obj.subcategory ? obj.subcategory : 0}`;

  return (dispatch) => {
    return axios.post(baseURL + 'api/workflow/workflow-config/' + url, obj.jsonObj, config).then((response) => {
      if (response.data.status === successStatusCode) {
        return response;
      }
      else{
        notification.error({
          message: 'Error',
          description: response.data.message,
          duration
        });
      }
    }).catch((error) => {
      notification.error({
        message: 'Error',
        description: "Invalid JSON Object",
        duration
      });
      return false;
    });
  };
}

export function updateDataObj(obj) {
  return (dispatch) => {
    dispatch(setNewProjectData(obj));
  };
}

export function getTemplateTypeList() {
  return (dispatch) => {
    return axios.get(baseURL + 'api/rgd/rgd-template-type-list').then((response) => {
      if (response.data.status === successStatusCode) {
        dispatch(setNewProjectData({
          templateTypeList: response.data.body
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

export function getOperatingModelList() {
  return (dispatch) => {
    return axios.get(baseURL + 'api/project/oper-model-list').then((response) => {
      if (response.data.status === successStatusCode) {
        dispatch(setNewProjectData({
          operatingModelList: response.data.body
        }));
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}
