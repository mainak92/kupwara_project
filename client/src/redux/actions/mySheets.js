import axios from 'axios';
import store from "../../utils/store";
import { SET_MYSHEETS_DATA } from '../../constants/actionTypes';

const baseURL = process.env.REACT_APP_API_HOST;
const duration = parseInt(process.env.REACT_APP_NOTIFICATION_DURATION);
const successStatusCode = parseInt(process.env.REACT_APP_SUCCESS_STATUS_CODE);

export function setMysheetsData(content) {
    return {
        type: SET_MYSHEETS_DATA,
        content,
    };
}

export function updateMysheetsObj(obj) {
    return (dispatch) => {
        dispatch(setMysheetsData(obj));
    };
}


export function getMysheetData(userId) {
    const config = {
        headers: { 'X-UserId': userId }
    };

    return (dispatch) => {
        return axios.get(baseURL + 'api/admin/get-mysheet-config', config).then((response) => {
            if (response.data.status === successStatusCode) {
                dispatch(setMysheetsData({
                    mySheetUrl: response.data.body ? response.data.body.mysheetUrl : "",
                    mySheetId: response.data.body ? response.data.body.id : null
                }));
            }
        }).catch((error) => {
            console.log(error);
        });
    };
}

export function saveMysheetData(userId, obj) {
    const config = {
        headers: { 'X-UserId': userId }
    };
    return (dispatch) => {
        return axios.post(baseURL + 'api/admin/save-mysheet-config', obj, config).then((response) => {
            return response;
        }).catch((error) => {
            console.log(error);
        });
    };
}
