import axios from 'axios';
import store from "../../utils/store";
import { SET_CLAIM_PROJECT_DATA } from '../../constants/actionTypes';
import { notification } from 'antd';
import intlUni from 'react-intl-universal';
const baseURL = process.env.REACT_APP_API_HOST;
const duration = parseInt(process.env.REACT_APP_NOTIFICATION_DURATION);
const successStatusCode = parseInt(process.env.REACT_APP_SUCCESS_STATUS_CODE);

export function setProjectClaimsData(content) {
    return {
        type: SET_CLAIM_PROJECT_DATA,
        content
    };
}

export function getProjectClaimsMasterData() {
    return (dispatch) => {
        return axios.get(baseURL + 'api/admin/pmgroup/master-data').then((response) => {
            if (response.status === successStatusCode) {
                dispatch(setProjectClaimsData(response.data.body.metadata));
                dispatch(setProjectClaimsData({
                    defaultGroupExist: response.data.body.isGroupExist
                }));
                return response.data.body.metadata;
            } else {
                notification.error({
                    message: 'Error',
                    description: response.data.message,
                    duration
                });
                return false;
            }
        }).catch((error) => {
            console.log(error);
            notification.error({
                message: 'Error',
                description: intlUni.get('something.went.wrong'),
                duration
            });
            return false;
        });
    }
}

export function updateProjectClaimsData(obj) {
    return (dispatch) => {
        return dispatch(setProjectClaimsData(obj));
    };
}

export function createNewGroup(userId, obj) {
    const config = {
        headers: {
            'X-UserId': userId
        }
    }
    return (dispatch) => {
        return axios.post(baseURL + 'api/admin/pmgroup/create-group', obj, config).then((response) => {
            if (response.status === successStatusCode) {
                notification.success({
                    message: 'Success',
                    description: response.data.message,
                    duration
                });
            }
        }).catch((error) => {
            console.log(error);
        });
    };
}

export function viewAllClaimGroups(searchName = "", loadedRecords = 0, totalRecords = 10, obj) {
    const newObj = {
        "loadedRecords": loadedRecords,
        "locale": "en",
        "totalRecordsPerPage": totalRecords,
        "searchCategoryName": searchName
    };
    !obj ? obj = newObj : obj;
    return (dispatch) => {
        return axios.post(baseURL + 'api/admin/pmgroup/view-group', obj).then((response) => {
            if (response.status === successStatusCode) {
                dispatch(setProjectClaimsData({
                    totalClaimGroups: response.data.body.pmgroupDetails,
                    loadedRecords: response.data.body.totalRecords,
                    totalRecords: response.data.body.totalRecordsPerPage
                }));
                return true;
            } else {
                notification.error({
                    message: 'Error',
                    description: response.data.message,
                    duration
                });
                return false;
            }
        }).catch((error) => {
            console.log(error);
            notification.error({
                message: 'Error',
                description: intlUni.get('something.went.wrong'),
                duration
            });
            return false;
        });
    }
}

export function deleteClaimGroup(userId, groupId) {
    const config = {
        headers: {
            'X-UserId': userId
        },
        params: {
            groupId
        }
    }
    return (dispatch) => {
        return axios.delete(baseURL + 'api/admin/pmgroup/delete-group', config).then((response) => {
            if (response.status === successStatusCode) {
                notification.success({
                    message: 'Success',
                    description: response.data.message,
                    duration
                });
            } else {
                notification.error({
                    message: 'Error',
                    description: response.data.message,
                    duration
                });
                return false;
            }
        }).catch((error) => {
            console.log(error);
            notification.error({
                message: 'Error',
                description: intlUni.get('something.went.wrong'),
                duration
            });
            return false;
        });
    }
}

export function editGroup(userId, obj) {
    const config = {
        headers: {
            'X-UserId': userId
        }
    }
    return (dispatch) => {
        return axios.put(baseURL + 'api/admin/pmgroup/edit-group', obj, config).then((response) => {
            if (response.data.status === successStatusCode) {
                notification.success({
                    message: 'Success',
                    description: response.data.message,
                    duration
                });
            }
            else {
                notification.error({
                    message: 'Error',
                    description: response.data.message,
                    duration
                });
            }
        }).catch((error) => {
            notification.error({
                message: 'Error',
                description: response.data.message,
                duration
            });
        });
    };
}

export function viewSearchGroupData(searchData, groupId) {
    const config = {
        params: {
            searchData,
            groupId
        }
    };
    return (dispatch) => {
        return axios.get(baseURL + 'api/admin/pmgroup/view-group-search-data', config).then((response) => {
            if (response.data.status === successStatusCode) {
                dispatch(setProjectClaimsData({
                    filteredResult: response.data.body
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

export function getUnclaimProjectList(obj) {
    return (dispatch) => {
        return axios.post(baseURL + 'api/admin/pmgroup/unclaim-project-list', obj).then((response) => {
            if (response.data.status === successStatusCode) {
                dispatch(setProjectClaimsData({
                    unclaimProjects: response.data.body.pmGroupUnclaimProject,
                    loadedRecords: response.data.body.totalRecords,
                    totalRecords: response.data.body.totalRecordsPerPage
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

export function getProjectDetails(projectId) {
    const st = store.getState();
    const config = {
        params: {
            projectId,
            locale: 'en'
        }
    }
    return (dispatch) => {
        return axios.get(baseURL + 'api/project/project-details', config).then((response) => {
            if (response.status === successStatusCode) {
                dispatch(setProjectClaimsData({
                    projectDetails: response.data.body
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

export function assignPM(userId, projectId, assignedUserId) {
    return (dispatch) => {
        const config = {
            headers: {
                'X-UserId': userId
            },
            params: {
                projectId,
                assignedUserId
            }
        }
        return axios.post(baseURL + 'api/admin/pmgroup/assign-project', null, config).then((response) => {
            if (response.status === successStatusCode) {
                notification.success({
                    message: 'Success',
                    description: response.data.message,
                    duration
                });
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

export function getPMAllocationMasterData() {
    return (dispatch) => {
        return axios.get(baseURL + 'api/admin/pmgroup/pm-allocation-master-data').then((response) => {
            if (response.status === successStatusCode) {
                dispatch(setProjectClaimsData(response.data.body.metadata));
                return response.data.body.metadata;
            } else {
                notification.error({
                    message: 'Error',
                    description: response.data.message,
                    duration
                });
                return false;
            }
        }).catch((error) => {
            console.log(error);
            notification.error({
                message: 'Error',
                description: intlUni.get('something.went.wrong'),
                duration
            });
            return false;
        });
    }
}

export function getSubCategory() {
    return (dispatch) => {
        return axios.get(baseURL + 'api/subCategory/list').then((response) => {
            if (response.status === successStatusCode) {
                dispatch(setProjectClaimsData({
                    subCategories : response.data.body
                }));
            } else {
                notification.error({
                    message: 'Error',
                    description: response.data.message,
                    duration
                });
                return false;
            }
        }).catch((error) => {
            console.log(error);
            notification.error({
                message: 'Error',
                description: intlUni.get('something.went.wrong'),
                duration
            });
            return false;
        });
    }
}

export function getRequestType() {
    return (dispatch) => {
        return axios.get(baseURL + 'api/requestType/list').then((response) => {
            if (response.status === successStatusCode) {
                dispatch(setProjectClaimsData({
                    requestTypes: response.data.body
                }));
            } else {
                notification.error({
                    message: 'Error',
                    description: response.data.message,
                    duration
                });
                return false;
            }
        }).catch((error) => {
            console.log(error);
            notification.error({
                message: 'Error',
                description: intlUni.get('something.went.wrong'),
                duration
            });
            return false;
        });
    }
}

export function fetchAllPMs(projectId, searchKey = "", userId) {
    const st = store.getState();
    const config = {
        headers: { 'X-UserId': userId },
        params: { 
            projectId: projectId,
            searchKey: searchKey 
        }
    }
    return (dispatch) => {
        return axios.get(baseURL + 'api/app/pm/get-pm-list', config).then((response) => {
            return response;
        }).catch((error) => {
            notification.error({
                message: intlUni.get("notification.error"),
                description: intlUni.get('something.went.wrong'),
                duration: NOTIFICATION_DURATION
            });
            console.log(error);
            return false;
        });
    };
}

export function fetchBPMTasks(projectId, locale) {
    const st = store.getState();
    const config = {
        headers: { 'X-UserId': st.global.userId },
        params: { projectId: projectId, locale: locale }
    }
    return (dispatch) => {
        return axios.get(baseURL + 'api/app/pm/get-all-pm-tasks', config).then((response) => {
            return response;
        }).catch((error) => {
            notification.error({
                message: intlUni.get("notification.error"),
                description: intlUni.get('something.went.wrong'),
                duration: NOTIFICATION_DURATION
            });
            console.log(error);
            return false;
        });
    };
}

export function claimProjectWithoutAdditionalPM(projectId) {
    const st = store.getState();
    const config = {
        headers: { 'X-UserId': st.global.userId,'locale': st.global.locale },
        params: { projectId: projectId }
    }
    return (dispatch) => {
        return axios.get(baseURL + 'api/app/pm/claim-project', config).then((response) => {
            if (response.data.status === successStatusCode) {
            notification.success({
                message: intlUni.get("notification.success"),
                description: response.data.message,
                duration: parseInt(process.env.REACT_APP_NOTIFICATION_DURATION)
            });
            return response;
        }
        else {
            notification.error({
                message: intlUni.get("notification.error"),
                description: intlUni.get('something.went.wrong'),
                duration: parseInt(process.env.REACT_APP_NOTIFICATION_DURATION)
            });
        }
        }).catch((error) => {
            notification.error({
                message: intlUni.get("notification.error"),
                description: intlUni.get('something.went.wrong'),
                duration: parseInt(process.env.REACT_APP_NOTIFICATION_DURATION)
            });
            console.log(error);
            return false;
        });
    };
}

export function claimProjectWithAdditionalPM(obj) {
    const st = store.getState();
    const config = {
        headers: { 'X-UserId': st.global.userId,'locale': st.global.locale }
    };
    return (dispatch) => {
        return axios.post(baseURL + 'api/app/pm/claim-project-with-multiple-pm', obj, config).then((response) => {
            if (response.data.status === successStatusCode) {
                notification.success({
                    message: intlUni.get("notification.success"),
                    description: response.data.message,
                    duration: parseInt(process.env.REACT_APP_NOTIFICATION_DURATION)
                });
                return response;
            } else {
                notification.error({
                    message: 'Error',
                    description: response.data.message,
                    duration: parseInt(process.env.REACT_APP_NOTIFICATION_DURATION)
                });
            }
            return response
        }).catch((error) => {
            notification.error({
                message: intlUni.get("notification.error"),
                description: intlUni.get('something.went.wrong'),
                duration: parseInt(process.env.REACT_APP_NOTIFICATION_DURATION)
            });
            console.log(error);
            return false;
        });
    };
}