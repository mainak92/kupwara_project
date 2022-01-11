import axios from 'axios';
import { SET_ROLE_DATA } from '../../constants/actionTypes';
import { notification } from 'antd';
import intlUni from 'react-intl-universal';

const baseURL = process.env.REACT_APP_API_HOST;
const successStatusCode = parseInt(process.env.REACT_APP_SUCCESS_STATUS_CODE);
const duration = parseInt(process.env.REACT_APP_NOTIFICATION_DURATION);

export function setRoleData(content) {
  return {
    type: SET_ROLE_DATA,
    content,
  };
}

export function updateRoleObj(obj) {
  return (dispatch) => {
    dispatch(setRoleData(obj));
  };
}


export function getRoleList(searchKey) {
  let config;
  searchKey ? config = {
    params: { 'searchKey': searchKey }
  } : config = {};

  return (dispatch) => {
    return axios.get(baseURL + 'api/role-management/fetch-role-list', config).then((response) => {
      if (response.data.status === successStatusCode) {
        dispatch(setRoleData({
          roleList: response.data.body
        }));
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function createRole(userId, obj) {
  const config = {
    headers: { 'X-UserId': userId }
  };
  return (dispatch) => {
    return axios.post(baseURL + 'api/role-management/create-role', obj, config).then((response) => {
      return response;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function createProjectRole(userId, obj) {
  const config = {
    headers: { 'X-UserId': userId }
  };
  return (dispatch) => {
    return axios.post(baseURL + 'api/acm/create-project-role', obj, config).then((response) => {
      return response;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function getApplicationPermissionList(roleId) {
  return (dispatch) => {
    return axios.get(baseURL + 'api/acm/get-application-permission-list/' + roleId).then((response) => {
      if (response.data.status === successStatusCode) {
        dispatch(setRoleData({
          applicationPermissionList: response.data.body
        }));
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function getProjectRolePermissionList(roleId) {
  return (dispatch) => {
    return axios.get(baseURL + 'api/acm/get-project-role-permission-list/' + roleId).then((response) => {
      if (response.data.status === successStatusCode) {
        dispatch(setRoleData({
          projectRolePermissionList: response.data.body
        }));
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function updateApplicationPermissionList(userId, obj) {
  const config = {
    headers: { 'X-UserId': userId }
  };
  return (dispatch) => {
    return axios.put(baseURL + 'api/acm/update-application-permission-list', obj, config).then((response) => {
      return response;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function updateProjectRolePermissionList(userId, obj) {
  const config = {
    headers: { 'X-UserId': userId }
  };
  return (dispatch) => {
    return axios.put(baseURL + 'api/acm/update-project-role-permission-list', obj, config).then((response) => {
      return response;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function getProjectRoleList(searchKey) {
  let config;
  searchKey ? config = {
    params: { 'searchKey': searchKey }
  } : config = {};
  return (dispatch) => {
    return axios.get(baseURL + 'api/acm/get-project-role-list', config).then((response) => {
      if (response.data.status === successStatusCode) {
        dispatch(setRoleData({
          projectRoleList: response.data.body
        }));
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function getActiveRoleList() {
  return (dispatch) => {
    return axios.get(baseURL + 'api/role-management/fetch-active-role-list').then((response) => {
      if (response.data.status === successStatusCode) {
        dispatch(setRoleData({
          activeRoleList: response.data.body
        }));
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function deleteRole(userId, obj) {
  const config = {
    headers: { 'X-UserId': userId },
    params: obj
  }
  return (dispatch) => {
    return axios.delete(baseURL + 'api/role-management/delete-role', config).then((response) => {
      return response;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function editRole(userId, obj) {
  const config = {
    headers: { 'X-UserId': userId },
    params: obj
  };
  return (dispatch) => {
    return axios.put(baseURL + 'api/role-management/edit-role', obj, config).then((response) => {
      if (response.data.status === successStatusCode) {
        notification.success({
          message: 'Success',
          description: response.message,
          duration
        });
        return response;
      }
      else {
        notification.error({
          message: 'Error',
          description: response.message,
          duration
        });
      }
    }).catch((error) => {
      console.log(error);
      notification.error({
        message: 'Error',
        description: response.status.message,
        duration
      });
    });
  };
}

export function getRoleFeaturesList(userId, obj) {
  const config = {
    headers: { 'x-userId': userId }
  };

  const url = '?appRoleId=' + `${obj.roleId}`;

  return (dispatch) => {
    return axios.get(baseURL + 'api/role-enablement/get-role-feature-list' + url, config).then((response) => {
      if (response.data.status === successStatusCode) {
        dispatch(setRoleData({
          roleFeaturesList: response.data.body
        }));
      }
    }).catch((error) => {
      console.log(error);
      return false;
    });
  };
}

export function updateRoleFeaturesList(userId, obj) {
  const config = {
    headers: {
      'x-userId': userId
    }
  };

  return (dispatch) => {
    return axios.put(baseURL + 'api/role-enablement/update-role-feature', obj, config).then((response) => {
      return response;
    }).catch((error) => {
      console.log(error);
      return false;
    });
  };
}


export function getHomeFeaturesList(userId, obj) {
  const config = {
    headers: { 'x-userId': userId }
  };

  const url = '?appRoleId=' + `${obj.roleId}`;

  return (dispatch) => {
    return axios.get(baseURL + 'api/role-enablement/get-home-feature-list' + url, config).then((response) => {
      if (response.data.status === successStatusCode) {
        dispatch(setRoleData({
          homeFeaturesList: response.data.body
        }));
      }
    }).catch((error) => {
      console.log(error);
      return false;
    });
  };
}

export function updateHomeFeaturesList(userId, obj) {
  const config = {
    headers: {
      'x-userId': userId
    }
  };

  return (dispatch) => {
    return axios.put(baseURL + 'api/role-enablement/update-home-feature', obj, config).then((response) => {
      return response;
    }).catch((error) => {
      console.log(error);
      return false;
    });
  };
}

export function getProjectRoleFeatureList(id, userId) {
  const config = {
    headers: {
      'x-userId': userId
    },
    params: {
      projectRoleId: id
    }
  };
  return (dispatch) => {
    return axios.get(baseURL + 'api/project-role/get-project-role-feature-list', config).then((response) => {
      if (response.data.status === successStatusCode) {
        dispatch(setRoleData({
          projectRoleFeatures: response.data.body
        }));
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function updateProjectRoleFeatureList(obj, userId) {
  const config = {
    headers: {
      'x-userId': userId
    }
  }
  return (dispatch) => {
    return axios.put(baseURL + 'api/project-role/update-project-role-feature', obj, config).then((response) => {
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