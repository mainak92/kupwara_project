import axios from 'axios';
import store from "../../utils/store";
import { SET_WORKFLOW_DATA } from '../../constants/actionTypes';
import { notification } from 'antd';
import intlUni from 'react-intl-universal';

const baseURL = process.env.REACT_APP_API_HOST;
const successStatusCode = parseInt(process.env.REACT_APP_SUCCESS_STATUS_CODE);
const duration = parseInt(process.env.REACT_APP_NOTIFICATION_DURATION);

export function setWorkflowData(content) {
  return {
    type: SET_WORKFLOW_DATA,
    content,
  };
}

export function getChannelList() {
  return (dispatch) => {
    return axios.get(baseURL + 'api/project/channel-list').then((response) => {
      if (response.data.status === successStatusCode) {
        dispatch(setWorkflowData({
          channelList: response.data.body
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

export function getRequestTypeList(channelId) {
  const config = {
    params: {
      channelId: channelId
    }
  };
  return (dispatch) => {
    return axios.get(baseURL + 'api/project/requestType-list', config).then((response) => {
      if (response.data.status === successStatusCode) {
        dispatch(setWorkflowData({
          requestTypeList: response.data.body
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

export function getSubChannelList(channelId) {
	const config = {
		params: {
			channelId: channelId
		}
	};
	return (dispatch) => {
		return axios.get(baseURL + 'api/project/subChannel-list', config).then((response) => {
			if (response.data.status === successStatusCode) {
				dispatch(setWorkflowData({
					subChannelList: response.data.body
				}));
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

export function getRegionList() {
	return (dispatch) => {
		return axios.get(baseURL + 'api/region/list').then((response) => {
			if (response.data.status === successStatusCode) {
				dispatch(setWorkflowData({
					regionList: response.data.body
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

export function getComplexityList() {
	return (dispatch) => {
		return axios.get(baseURL + 'api/cmplexity/list').then((response) => {
			if (response.data.status === successStatusCode) {
				dispatch(setWorkflowData({
					complexityList: response.data.body
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

export function createRGDTemplate(obj) {
  const st = store.getState();
  const config = {
    headers: { 'X-UserId': st.global.userId }
  };
  const url = `${obj.templateType}/${obj.channel}/${obj.projectType}/${obj.subcategory ? obj.subcategory : null}`;

  return (dispatch) => {
    return axios.post(baseURL + 'api/rgd/save-template/' + url, obj.jsonObj, config).then((response) => {
      return response;
    }).catch((error) => {
      // console.log(error);
      return false;
    });
  };
}

export function updateDataObj(obj) {
  return (dispatch) => {
    dispatch(setWorkflowData(obj));
  };
}

export function getTemplateTypeList() {
  return (dispatch) => {
    return axios.get(baseURL + 'api/rgd/rgd-template-type-list').then((response) => {
      if (response.data.status === successStatusCode) {
        dispatch(setWorkflowData({
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

export function downloadWorkflowJSON(obj) {
  const st = store.getState();
  const config = {
    headers: { 
      'X-UserId': st.global.userId,
      'locale': st.global.locale 
  }
};

return (dispatch) => {
  return axios.post(baseURL + 'api/workflow/download-workflow-json', obj , config).then((response) => {
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
