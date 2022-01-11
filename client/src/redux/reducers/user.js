import { SET_USER_DATA } from '../../constants/actionTypes';

const INITIAL_STATE = {
  userList: [],
  isEditUser: false,
  userFormData: {},
  showEditUserModal: false,
  emailDataLoader: false,
  activeUserList: [],
  filterData: {},
  countryCodeList: [],
  countryList: [],
  brandList: [],
  countryIds: [],
  regionList: [],
  regionCountryMap: {},
  subCategoryList: [],
  requestTypeList: [],
  displayDefault: true,
  activeProjects: null,
  appRoleList: [],
  selectedUserId: 0,
  selectedRoleId: 0,
  selectedRoleName: '',
  newSelectedUserId: 0,
  totalRecords: 0,
  currentPage: 1,
  channelFilters: [],
  subChannelFilters: [],
  brandFilters: [],
  countryFilters: [],
  projectNameFilters: [],
  projectRoleFilters: [],
  orderBy: 'creationTs',
  prevProjectNameFilters: [],
  openAdvanceFilter: false,
  searchKey: '',
  fetchRelationList: [],
  fetchSchoolList: [],
  fetchCollegeList: [],
  fetchOccupationList: []
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.content,
      };
    default:
      return state;
  }
};
