import { SET_MYSHEETS_DATA } from '../../constants/actionTypes';

const INITIAL_STATE = {
    mySheetUrl: "",
    mySheetId: null
};

export default (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case SET_MYSHEETS_DATA:
            return {
                ...state,
                ...action.content,
            };
        default:
            return state;
    }
};
