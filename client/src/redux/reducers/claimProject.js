import { SET_CLAIM_PROJECT_DATA } from '../../constants/actionTypes';

const INITIAL_STATE = {
  brands: [],
  channels: [],
  countries: [],
  projects: [],
  brandIds: [],
  channelIds: [],
  subChannelIds: [],
  requestTypeIds: [],
  countryIds: [],
  channelList: [],
  regions: [],
  complexities: [],
  userList: [],
  regionIds: [],
  complexityIds: [],
  userIds:[],
  groupName: "",
  defaultGroupExist: false,
  totalClaimGroups: [],
  targetKeys: [],
  groupUsers: [],
  groupId: 0,
  isDefault: false,
  mode: "",
  filteredResult: [],
  openAdvanceFilter: false,
  fromDate: "",
  toDate: "",
  onAdvanceFilter: false,
  loadedRecords: 0,
  totalRecords: 10,
  unclaimProjects: [],
  projectDetails: {},
  projectOwners: [],
  projectOwnerIds: [],
  fromDate: "",
  toDate: "",
  projectManagerIds: [],
  searchKey: "",
  subCategories: [],
  requestTypes: [],
  listBPMTasks: [],
  unclaimProjListDataLoading: true
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SET_CLAIM_PROJECT_DATA:
      return {
        ...state,
        ...action.content,
      };
    default:
      return state;
  }
};