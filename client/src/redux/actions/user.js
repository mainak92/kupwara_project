import axios from 'axios';
import { SET_USER_DATA } from '../../constants/actionTypes';
import { notification } from 'antd';
import intlUni from 'react-intl-universal';

const baseURL = process.env.REACT_APP_API_HOST;
const successStatusCode = parseInt(process.env.REACT_APP_SUCCESS_STATUS_CODE);
const duration = parseInt(process.env.REACT_APP_NOTIFICATION_DURATION);

export function setUserData(content) {
  return {
    type: SET_USER_DATA,
    content,
  };
}

export function getUserList(searchKey, primaryPhoneNo, secondaryPhoneNo, familyName, aadharCardNo, village, block, mohalla, voterId, grField) {
  let config = {
    params: {
      name: searchKey ? searchKey : undefined,
      primaryPhoneNo,
      secondaryPhoneNo,
      familyName,
      aadharCardNo,
      village,
      block,
      mohalla,
      voterId,
      grField
    }
  }
  return (dispatch) => {
    return axios.get(baseURL + 'api/fetch-users', config).then((response) => {
      if (response.status === successStatusCode) {
        dispatch(setUserData({
          userList: response.data
        }));
        return response.data;
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function fetchAllRelations(voterId) {
  let config = {
    params: {
      voterId
    }
  }
  return (dispatch) => {
    return axios.get(baseURL + 'api/fetch-all-relations', config).then((response) => {
      dispatch(setUserData({
        fetchRelationList: response.data
      }));
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function fetchSchools(voterId) {
  let config = {
    params: {
      voterId
    }
  }
  return (dispatch) => {
    return axios.get(baseURL + 'api/fetch-all-schools', config).then((response) => {
      dispatch(setUserData({
        fetchSchoolList: response.data
      }));
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  };
}
export function fetchColleges(voterId) {
  let config = {
    params: {
      voterId
    }
  }
  return (dispatch) => {
    return axios.get(baseURL + 'api/fetch-all-colleges', config).then((response) => {
      dispatch(setUserData({
        fetchCollegeList: response.data
      }));
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  };
}
export function fetchOccupations(voterId) {
  let config = {
    params: {
      voterId
    }
  }
  return (dispatch) => {
    return axios.get(baseURL + 'api/fetch-all-occupations', config).then((response) => {
      dispatch(setUserData({
        fetchOccupationList: response.data
      }));
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function deleteUser(obj) {
  return (dispatch) => {
    return axios.post(baseURL + 'api/delete-user', obj, {}).then((response) => {
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function deleteRelation(obj) {
  return (dispatch) => {
    return axios.post(baseURL + 'api/delete-relation', obj, {}).then((response) => {
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function deleteSchool(obj) {
  return (dispatch) => {
    return axios.post(baseURL + 'api/delete-school', obj, {}).then((response) => {
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  };
}
export function deleteCollege(obj) {
  return (dispatch) => {
    return axios.post(baseURL + 'api/delete-college', obj, {}).then((response) => {
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  };
}
export function deleteOccupation(obj) {
  return (dispatch) => {
    return axios.post(baseURL + 'api/delete-occupation', obj, {}).then((response) => {
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  };
}
export function createUser(userId, obj) {
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    }
  }
  return (dispatch) => {
    return axios.post(baseURL + 'api/create-person-details', obj, config).then((response) => {
      return response;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function updateExistingUserData(userId, obj) {
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    }
  }
  return (dispatch) => {
    return axios.post(baseURL + 'api/edit-person-details', obj, config).then((response) => {
      console.log(response);
      return response;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function saveRelation(obj) {
  const config = {
    // headers: {
    //   'content-type': 'multipart/form-data',
    //   'X-UserId': userId
    // }
  }
  // const obj = {
  //   relationType,
  //   personAadharNumber,
  //   relationAadharNo,
  //   relationName,
  //   relationDob
  // }
  return (dispatch) => {
    return axios.post(baseURL + 'api/save-relation-details', obj, {}).then((response) => {
      return response;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function updateExistingUserStatus(userId, obj) {
  const config = {
    headers: { 'X-UserId': userId }
  };
  return (dispatch) => {
    return axios.put(baseURL + 'api/admin/update-status', obj, config).then((response) => {
      return response;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function updateUserData(obj) {
  return (dispatch) => {
    dispatch(setUserData(obj));
  };
}

export function getActiveUserList() {
  return (dispatch) => {
    return axios.get(baseURL + 'api/admin/fetch-active-users').then((response) => {
      if (response.data.status) {
        return response.data.body;
        // dispatch(setUserData({
        //   activeUserList: response.data.body
        // }));
      }
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function assignRoleToUser(userId, obj) {
  const config = {
    headers: { 'X-UserId': userId }
  };
  return (dispatch) => {
    return axios.post(baseURL + 'api/admin/assign-role', obj, config).then((response) => {
      return response;
    }).catch((error) => {
      console.log(error);
      notification.error({
        message: 'Error',
        description: response.data.message,
        duration
      });
    });
  };
}

export function uploadUsers(userId, obj) {
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      'X-UserId': userId
    }
  }
  return (dispatch) => {
    return axios.post(baseURL + 'api/admin/bulk-create-user', obj, config).then((response) => {
      return response;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function downloadUserTemplate() {
  return (dispatch) => {
    return axios.get(baseURL + 'api/admin/download-bulk-user-template', { responseType: "blob" }).then((response) => {
      return response;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function bulkUserAssign(userId, obj) {
  const config = {
    headers: { 'X-UserId': userId }
  };
  return (dispatch) => {
    return axios.put(baseURL + 'api/admin/update-bulk-user-reassignment', obj, config).then((response) => {
      return response;
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function validateVoterId(voterId) {
  let config = {
    params: {
      voterId
    }
  }
  return (dispatch) => {
    return axios.get(baseURL + 'api/validate-voterId', config).then((response) => {
      dispatch(setUserData({
        fetchOccupationList: response.data
      }));
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  };
}