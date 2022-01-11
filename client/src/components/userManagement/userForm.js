import React from 'react';
import { connect } from 'react-redux';
import {
  Radio, Button, Icon, Form, Select, Input,
  Avatar, Upload, notification, message, Spin, Switch, Table, Row, Col, DatePicker, Modal
} from 'antd';
import { createUser, updateExistingUserData, updateUserData, getUserList, deleteRelation, fetchAllRelations, saveRelation, fetchSchools, fetchColleges, fetchOccupations, deleteSchool, deleteCollege, deleteOccupation, validateVoterId } from '../../redux/actions/user';
import { getActiveRoleList } from '../../redux/actions/role';
import '../../assets/styles/card.css';
import moment from 'moment';
import PageStyle from './userManagementStyle';
import { withRouter, Link } from 'react-router-dom';
import IntlMessages from '../../utils/IntlMessages';
import intlUni from 'react-intl-universal';
import { json } from 'body-parser';

const duration = parseInt(process.env.REACT_APP_NOTIFICATION_DURATION);
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { Search, TextArea } = Input;

class UserForm extends React.Component {
  state = {
    loading: false,
    confirmDirty: false,
    imageUrl: '',
    userObj: {},
    masterRolesList: [],
    disabled: true,
    enableCountryDropdown: false,
    relationData: [],
    schoolData: [],
    collegeData: [],
    occupationData: [],
    schoolId: 0,
    collegeId: 0,
    occupationId: 0,
    personAadharNumber: "",
    schoolName: "",
    showRelationModal: false,
    showSchoolModal: false,
    showCollegeModal: false,
    showOccupationModal: false,
    schoolName: "",
    collegeName: "",
    occupationName: "",
    relationAadharNo: "",
    relationType: "",
    relationName: "",
    voterId: ""
  }

  componentDidMount() {
    this.setInitialValues();
  }

  componentWillReceiveProps(nextProps) {
    if ((!nextProps.user.displayDefault)) {
      this.setEditUserInitialValues();
    }
  }

  componentWillUnmount() {
    this.reset();
    this.props.updateUserData({
      isEditUser: false
    });
  }

  setEditUserInitialValues = (userObj) => {
    this.setState({ loading: true });
    const { form } = this.props;
    const { userFormData, isEditUser } = this.props.user;

    if (isEditUser) {
      form.setFieldsValue({
        userName: userFormData.name,
        aadharNo: userFormData.aadharCardNo,
        dob: userFormData.dateOfBirth ? moment(userFormData.dateOfBirth) : "",
        email: userFormData.email,
        familyName: userFormData.familyName,
        primaryPhoneNo: userFormData.primaryPhoneNo,
        secondaryPhoneNo: userFormData.secondaryPhoneNo,
        block: userFormData.block,
        district: userFormData.district,
        houseNo: userFormData.houseNo,
        mohalla: userFormData.mohalla,
        panchayat: userFormData.panchayat,
        tehsil: userFormData.tehsil,
        village: userFormData.village,
        ward: userFormData.ward,
        bankName: userFormData.bankName,
        ifscCode: userFormData.bankIFSCode,
        visitedSouthKashmir: userFormData.beenToSouthKashmir,
        visitedPak: userFormData.beenToPakOrheldVisa,
        beenOGW: userFormData.beenOGWorStonePelterOrSmuggler,
        wasArrested: userFormData.arrestesEverForAnyIncident,
        politicalAffiliation: userFormData.politicalAffiliation,
        visitedMasjid: userFormData.masjidFrequentlyAttended,
        associatedWithArmy: userFormData.armyOrSFAgencies,
        hasPOKRelatives: userFormData.relativesInPOk,
        comments: userFormData.comanderComments,
        hasSocialMedia: userFormData.activeSocialMediaUser,
        grField: userFormData.grField,
        acNumber: userFormData.acNumber,
        acName: userFormData.acName,
        acPartNumber: userFormData.acPartNumber,
        acSectionNumber: userFormData.acSectionNumber,
        acSectionName: userFormData.acSectionName,
        sectionSerialNumber: userFormData.sectionSerialNumber,
        voterId: userFormData.voterId,
        gender: userFormData.gender,
        bankAccountNumber: userFormData.bankAccountNumber
      }, () => {
        form.setFieldsValue({
          twitterId: userFormData.twitterId,
          facebookId: userFormData.facebookId,
          instaId: userFormData.instagramId
        })
      });
      this.setState({ imageUrl: `${process.env.REACT_APP_HEADER_IMG_PATH}/${userFormData.fileName}` });
    }
    this.props.updateUserData({
      displayDefault: true,
      emailDataLoader: false
    });
    this.setState({ loading: false });
  };

  setInitialValues = () => {
    const { form } = this.props;
    const { userFormData, isEditUser } = this.props.user;

    if (isEditUser) {
      form.setFieldsValue({
        userName: userFormData.name,
        aadharNo: userFormData.aadharCardNo,
        dob: userFormData.dateOfBirth ? moment(userFormData.dateOfBirth) : "",
        email: userFormData.email,
        familyName: userFormData.familyName,
        primaryPhoneNo: userFormData.primaryPhoneNo,
        secondaryPhoneNo: userFormData.secondaryPhoneNo,
        block: userFormData.block,
        district: userFormData.district,
        houseNo: userFormData.houseNo,
        mohalla: userFormData.mohalla,
        panchayat: userFormData.panchayat,
        tehsil: userFormData.tehsil,
        village: userFormData.village,
        ward: userFormData.ward,
        bankName: userFormData.bankName,
        ifscCode: userFormData.bankIFSCode,
        visitedSouthKashmir: userFormData.beenToSouthKashmir,
        visitedPak: userFormData.beenToPakOrheldVisa,
        beenOGW: userFormData.beenOGWorStonePelterOrSmuggler,
        wasArrested: userFormData.arrestesEverForAnyIncident,
        politicalAffiliation: userFormData.politicalAffiliation,
        visitedMasjid: userFormData.masjidFrequentlyAttended,
        associatedWithArmy: userFormData.armyOrSFAgencies,
        hasPOKRelatives: userFormData.relativesInPOk,
        comments: userFormData.comanderComments,
        hasSocialMedia: userFormData.activeSocialMediaUser,
        grField: userFormData.grField,
        acNumber: userFormData.acNumber,
        acName: userFormData.acName,
        acPartNumber: userFormData.acPartNumber,
        acSectionNumber: userFormData.acSectionNumber,
        acSectionName: userFormData.acSectionName,
        sectionSerialNumber: userFormData.sectionSerialNumber,
        voterId: userFormData.voterId,
        gender: userFormData.gender,
        bankAccountNumber: userFormData.bankAccountNumber
      }, () => {
        form.setFieldsValue({
          twitterId: userFormData.twitterId,
          facebookId: userFormData.facebookId,
          instaId: userFormData.instagramId
        })
      });
      this.setState({ imageUrl: `${process.env.REACT_APP_HEADER_IMG_PATH}/${userFormData.fileName}` });
      this.props.updateUserData({
        emailDataLoader: false
      });
    } else {
      form.resetFields();
      form.setFieldsValue({
        userName: "",
        aadharNo: "",
        dob: "",
        email: "",
        familyName: "",
        primaryPhoneNo: "",
        secondaryPhoneNo: "",
        block: "",
        district: "",
        houseNo: "",
        mohalla: "",
        panchayat: "",
        tehsil: "",
        village: "",
        ward: "",
        twitterId: "",
        facebookId: "",
        instaId: "",
        bankName: "",
        ifscCode: "",
        visitedSouthKashmir: false,
        visitedPak: false,
        beenOGW: false,
        wasArrested: false,
        politicalAffiliation: false,
        visitedMasjid: false,
        associatedWithArmy: false,
        hasPOKRelatives: false,
        comments: "",
        hasSocialMedia: false,
        grField: "",
        acNumber: "",
        acName: "",
        acPartNumber: "",
        acSectionNumber: "",
        acSectionName: "",
        sectionSerialNumber: "",
        voterId: "",
        gender: "",
        bankAccountNumber: ""
      });
      this.setState({ imageUrl: '' });
      this.props.updateUserData({
        emailDataLoader: false
      });
    }
  };

  reset = () => {
    this.setInitialValues();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.validateVoterId(values.voterId).then((result) => {
          if (result === "Error") {
            notification.error({
              message: `Voter Id: ${values.voterId} already exists.`,
              duration: 3
            });
          }
          else {
            this.saveRole(values);
          }
        });
      }
    });
  }

  beforeUpload(file) {
    if (file.type == "image/jpeg" || file.type == "image/png") {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
      return isLt2M;
    } else {
      message.error('File must be of JPG/PNG type.');
      return null;
    }
  }

  fileRequest = (event) => {
    if (event.file.type == "image/jpeg" || event.file.type == "image/png") {
      var reader = new FileReader();
      reader.readAsDataURL(event.file);
      const that = this;
      reader.onload = function () {
        that.setState({
          imageUrl: this.result,
          image: event.file
        });
      };
    } else {
      this.setState({
        imageUrl: null,
        image: null
      });
    }

    return {
      abort() { }
    }
  }

  addSchool = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('schoolKeys');
    const newaddedKey = this.state.schoolId + 1;
    const nextKeys = keys.concat(newaddedKey);
    // can use data-binding to set
    // important! notify form to detect changes
    this.setState({
      schoolId: newaddedKey
    });
    form.setFieldsValue({
      schoolKeys: nextKeys,
    });
  };

  removeSchool = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('schoolKeys');
    // We need at least one passenger
    if (keys.length === 0) {
      return;
    }
    this.setState({
      schoolId: this.state.schoolId - 1
    });
    // can use data-binding to set
    form.setFieldsValue({
      schoolKeys: keys.filter(key => key !== k),
    });
  };

  addCollege = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('collegeKeys');
    const newaddedKey = this.state.collegeId + 1;
    const nextKeys = keys.concat(newaddedKey);
    // can use data-binding to set
    // important! notify form to detect changes
    this.setState({
      collegeId: newaddedKey
    });
    form.setFieldsValue({
      collegeKeys: nextKeys,
    });
  };

  removeCollege = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('collegeKeys');
    // We need at least one passenger
    if (keys.length === 0) {
      return;
    }
    this.setState({
      collegeId: this.state.collegeId - 1
    });
    // can use data-binding to set
    form.setFieldsValue({
      collegeKeys: keys.filter(key => key !== k),
    });
  };

  addOccupation = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('occupationKeys');
    const newaddedKey = this.state.occupationId + 1;
    const nextKeys = keys.concat(newaddedKey);
    // can use data-binding to set
    // important! notify form to detect changes
    this.setState({
      occupationId: newaddedKey
    });
    form.setFieldsValue({
      occupationKeys: nextKeys,
    });
  };

  removeOccupation = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('occupationKeys');
    // We need at least one passenger
    if (keys.length === 0) {
      return;
    }
    this.setState({
      occupationId: this.state.occupationId - 1
    });
    // can use data-binding to set
    form.setFieldsValue({
      occupationKeys: keys.filter(key => key !== k),
    });
  };

  reRoute = () => {
    this.props.history.push({
      pathname: `${process.env.REACT_APP_LINK_TO_PATH}User/ManageUser`
    });
  }

  saveRole = (values) => {
    const { userId } = this.props.global;
    const { userFormData, isEditUser } = this.props.user;
    let collegeAddress = values.collegeAddress;
    let collegeDegreeName = values.collegeDegreeName;
    let collegeName = values.collegeName;
    let collegePassDate = values.collegePassDate;
    let occupationAddress = values.occupationAddress;
    let occupationLastDate = values.occupationLastDate;
    let occupationName = values.occupationName;
    let occupationPositionName = values.occupationPositionName;
    let schoolAddress = values.schoolAddress;
    let schoolDegreeName = values.schoolDegreeName;
    let schoolName = values.schoolName;
    let schoolPassDate = values.schoolPassDate;

    let collegeKeys = values.collegeKeys;
    let schoolKeys = values.schoolKeys;
    let occupationKeys = values.occupationKeys;

    let collegeDetails = collegeKeys && collegeKeys.length > 0 && collegeKeys.map((item) => {
      return {
        collegeName: collegeName[item],
        degreeName: collegeDegreeName[item],
        dateOfPassing: moment(collegePassDate[item]).format("DD-MM-YYYY"),
        collegeAddress: collegeAddress[item],
        voterId: values.voterId
      }
    });

    let schoolDetails = schoolKeys && schoolKeys.length > 0 && schoolKeys.map((item) => {
      return {
        schoolName: schoolName[item],
        degreeName: schoolDegreeName[item],
        dateOfPassing: moment(schoolPassDate[item]).format("DD-MM-YYYY"),
        schoolAddress: schoolAddress[item],
        voterId: values.voterId
      }
    });

    let occupationDetails = occupationKeys && occupationKeys.length > 0 && occupationKeys.map((item) => {
      return {
        occupationName: occupationName[item],
        position: occupationPositionName[item],
        lastWorkingDate: moment(occupationLastDate[item]).format("DD-MM-YYYY"),
        occupationAddress: occupationAddress[item],
        voterId: values.voterId
      }
    });
    const obj = new FormData();
    obj.append('name', values.userName);
    obj.append('familyName', values.familyName);
    obj.append('dateOfBirth', values.dob ? moment(values.dob).format("DD-MM-YYYY") : "");
    obj.append('aadharCardNo', values.aadharNo);
    obj.append('email', values.email);
    obj.append('primaryPhoneNo', values.primaryPhoneNo);
    obj.append('secondaryPhoneNo', values.secondaryPhoneNo);
    obj.append('schoolDetails', schoolDetails ? JSON.stringify(schoolDetails) : []);
    obj.append('collegeDetails', collegeDetails ? JSON.stringify(collegeDetails) : []);
    obj.append('occupationDetails', occupationDetails ? JSON.stringify(occupationDetails) : []);
    obj.append('houseNo', values.houseNo);
    obj.append('mohalla', values.mohalla);
    obj.append('village', values.village);
    obj.append('ward', values.ward);
    obj.append('panchayat', values.panchayat);
    obj.append('block', values.block);
    obj.append('tehsil', values.tehsil);
    obj.append('district', values.district);
    obj.append('twitterId', values.twitterId);
    obj.append('facebookId', values.facebookId);
    obj.append('instagramId', values.instaId);
    obj.append('bankName', values.bankName);
    obj.append('bankIFSCode', values.ifscCode);
    obj.append('beenToSouthKashmir', values.visitedSouthKashmir);
    obj.append('beenToPakOrheldVisa', values.visitedPak);
    obj.append('beenOGWorStonePelterOrSmuggler', values.beenOGW);
    obj.append('arrestesEverForAnyIncident', values.wasArrested);
    obj.append('politicalAffiliation', values.politicalAffiliation);
    obj.append('masjidFrequentlyAttended', values.visitedMasjid);
    obj.append('armyOrSFAgencies', values.associatedWithArmy);
    obj.append('relativesInPOk', values.hasPOKRelatives);
    obj.append('grField', values.grField);
    obj.append('comanderComments', values.comments);
    obj.append('acNumber', values.acNumber);
    obj.append('acName', values.acName);
    obj.append('acPartNumber', values.acPartNumber);
    obj.append('acSectionNumber', values.acSectionNumber);
    obj.append('acSectionName', values.acSectionName);
    obj.append('sectionSerialNumber', values.sectionSerialNumber);
    obj.append('voterId', values.voterId);
    obj.append('gender', values.gender);
    obj.append('bankAccountNumber', values.bankAccountNumber);
    if (this.state.image) {
      obj.append('filename', this.state.image);
    }

    const successStatusCode = parseInt(process.env.REACT_APP_SUCCESS_STATUS_CODE);
    if (isEditUser) {
      this.setState({ loading: true });
      this.props.updateUserData({ emailDataLoader: true });
      this.props.updateExistingUserData(userId, obj).then(
        (res) => {
          this.props.updateUserData({
            showEditUserModal: false, emailDataLoader: false,
            userFormData: {}, isEditUser: false
          });
          notification.success({
            message: "User Edited Successfully",
            duration: 3
          });
          this.reRoute();
          this.setState({ loading: false });
          this.props.updateUserData({ emailDataLoader: false });
        }
      );
    } else {
      this.setState({ loading: true });
      this.props.createUser(userId, obj).then(
        (res) => {
          this.props.updateUserData({ userFormData: {} });
          notification.success({
            message: 'User created successfully',
            duration: 3
          });
          this.setInitialValues();
          this.props.getUserList();
          this.setState({ loading: false });
          this.props.updateUserData({ emailDataLoader: false });
        }
      );
    }

  }

  fetchRelations = () => {
    const { getFieldValue } = this.props.form;
    this.props.fetchAllRelations(getFieldValue('voterId')).then((res) => {
      let relatives = res && res.filter((item) => (item.relation !== "HAS_WORKED" && item.relation !== "STUDIED_AT" && item.relation !== "HAS_PHONE"));
      this.setState({
        relationData: relatives
      });
      if (relatives && relatives.length === 0) {
        notification.error({
          message: "No Relations Found",
          duration: 3
        });
      }
    });
  }

  fetchSchools = () => {
    const { getFieldValue } = this.props.form;
    this.props.fetchSchools(getFieldValue('voterId')).then((res) => {
      this.setState({
        schoolData: res
      });
      if (res && res.length === 0) {
        notification.error({
          message: "No Schools Found",
          duration: 3
        });
      }
    });
  }

  fetchColleges = () => {
    const { getFieldValue } = this.props.form;
    this.props.fetchColleges(getFieldValue('voterId')).then((res) => {
      this.setState({
        collegeData: res
      });
      if (res && res.length === 0) {
        notification.error({
          message: "No Colleges Found",
          duration: 3
        });
      }
    });
  }

  fetchOccupations = () => {
    const { getFieldValue } = this.props.form;
    this.props.fetchOccupations(getFieldValue('voterId')).then((res) => {
      this.setState({
        occupationData: res
      });
      if (res && res.length === 0) {
        notification.error({
          message: "No Occupations Found",
          duration: 3
        });
      }
    });
  }

  deleteRelationModal = (record) => {
    const { getFieldValue } = this.props.form;
    this.setState({
      personVoterId: getFieldValue('voterId'),
      relationVoterId: record.voterId,
      relationType: record.relation,
      relationName: record.name,
      showRelationModal: true
    });
  }

  deleteRelation = () => {
    const obj = {
      personVoterId: this.state.personVoterId,
      relationVoterId: this.state.relationVoterId,
      relationType: this.state.relationType
    }
    this.props.deleteRelation(obj).then((res) => {
      this.fetchRelations();
      this.setState({
        personVoterId: "",
        relationVoterId: "",
        relationType: "",
        relationName: "",
        showRelationModal: false
      });
      notification.success({
        message: "Relation deleted successfully",
        duration: 3
      });
    })
  }

  deleteSchoolModal = (record) => {
    const { getFieldValue } = this.props.form;
    this.setState({
      voterId: getFieldValue('voterId'),
      schoolName: record.schoolName,
      showSchoolModal: true
    });
  }

  deleteSchool = () => {
    const obj = {
      voterId: this.state.voterId,
      schoolName: this.state.schoolName
    }
    this.props.deleteSchool(obj).then((res) => {
      this.fetchSchools();
      this.setState({
        voterId: "",
        schoolName: "",
        showSchoolModal: false
      });
      notification.success({
        message: "School deleted successfully",
        duration: 3
      });
    })
  }

  deleteCollegeModal = (record) => {
    const { getFieldValue } = this.props.form;
    this.setState({
      voterId: getFieldValue('voterId'),
      collegeName: record.collegeName,
      showCollegeModal: true
    });
  }

  deleteCollege = () => {
    const obj = {
      voterId: this.state.voterId,
      collegeName: this.state.collegeName
    }
    this.props.deleteCollege(obj).then((res) => {
      this.fetchColleges();
      this.setState({
        voterId: "",
        collegeName: "",
        showCollegeModal: false
      });
      notification.success({
        message: "College deleted successfully",
        duration: 3
      });
    })
  }

  deleteOccupationModal = (record) => {
    const { getFieldValue } = this.props.form;
    this.setState({
      voterId: getFieldValue('voterId'),
      occupationName: record.occupationName,
      showOccupationModal: true,
    });
  }

  deleteOccupation = () => {
    const obj = {
      voterId: this.state.voterId,
      occupationName: this.state.occupationName
    }
    this.props.deleteOccupation(obj).then((res) => {
      this.fetchOccupations();
      this.setState({
        voterId: "",
        occupationName: "",
        showOccupationModal: false
      });
      notification.success({
        message: "Occupation deleted successfully",
        duration: 3
      });
    })
  }

  handleCancel = () => {
    this.setState({
      showSchoolModal: false,
      showCollegeModal: false,
      showOccupationModal: false,
      showRelationModal: false,
      schoolName: "",
      collegeName: "",
      occupationName: "",
      relationAadharNo: "",
      relationType: "",
      relationName: ""
    });
  }
  render() {
    const { isEditUser, userFormData } = this.props.user;
    const { loading } = this.state;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const columns = [{
      title: "Name",
      dataIndex: 'name',
      key: 'name',
    }, {
      title: "Relation",
      dataIndex: 'relation',
      key: 'relation',
    }, {
      title: "DOB",
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
    },
    {
      title: "Voter Id",
      dataIndex: 'voterId',
      key: 'voterId',
    },
    {
      title: "Aadhar No",
      dataIndex: 'aadharCardNo',
      key: 'aadharCardNo',
    },
    {
      title: "Address",
      dataIndex: 'address',
      key: 'address',
      width: "20%",
      render: (value, record) => {
        return `House No: ${record.houseNo}, Mohalla: ${record.mohalla}, Village: ${record.village}, Ward: ${record.ward}, Panchayat: ${record.panchayat}, Block: ${record.block}, Tehsil: ${record.tehsil}, District: ${record.district}`
      }
    },
    {
      title: <IntlMessages id="user.list.table.action" />,
      dataIndex: 'action',
      key: 'action',
      render: (val, record) => (
        <span>
          <Link to="#" onClick={() => { this.deleteRelationModal(record) }}><Icon type="delete" style={{ fontSize: "15px", color: "#6da9f6" }} /></Link>
        </span>
      )
    }
    ];
    const schoolColumns = [{
      title: "Name",
      dataIndex: 'schoolName',
      key: 'schoolName',
    }, {
      title: "Degree",
      dataIndex: 'degreeName',
      key: 'degreeName',
    }, {
      title: "Date",
      dataIndex: 'dateOfPassing',
      key: 'dateOfPassing',
    },
    {
      title: "Address",
      dataIndex: 'schoolAddress',
      key: 'schoolAddress',
      width: "20%"
    },
    {
      title: <IntlMessages id="user.list.table.action" />,
      dataIndex: 'action',
      key: 'action',
      render: (val, record) => (
        <span>
          <Link to="#" onClick={() => { this.deleteSchoolModal(record) }}><Icon type="delete" style={{ fontSize: "15px", color: "#6da9f6" }} /></Link>
        </span>
      )
    }
    ];

    const collegeColumns = [{
      title: "Name",
      dataIndex: 'collegeName',
      key: 'collegeName',
    }, {
      title: "Degree",
      dataIndex: 'degreeName',
      key: 'degreeName',
    }, {
      title: "Date",
      dataIndex: 'dateOfPassing',
      key: 'dateOfPassing',
    },
    {
      title: "Address",
      dataIndex: 'collegeAddress',
      key: 'collegeAddress',
      width: "20%"
    },
    {
      title: <IntlMessages id="user.list.table.action" />,
      dataIndex: 'action',
      key: 'action',
      render: (val, record) => (
        <span>
          <Link to="#" onClick={() => { this.deleteCollegeModal(record) }}><Icon type="delete" style={{ fontSize: "15px", color: "#6da9f6" }} /></Link>
        </span>
      )
    }
    ];

    const occupationColumns = [{
      title: "Name",
      dataIndex: 'occupationName',
      key: 'occupationName',
    }, {
      title: "Position",
      dataIndex: 'position',
      key: 'position',
    }, {
      title: "Date",
      dataIndex: 'lastWorkingDate',
      key: 'lastWorkingDate',
    },
    {
      title: "Address",
      dataIndex: 'occupationAddress',
      key: 'occupationAddress',
      width: "20%"
    },
    {
      title: <IntlMessages id="user.list.table.action" />,
      dataIndex: 'action',
      key: 'action',
      render: (val, record) => (
        <span>
          <Link to="#" onClick={() => { this.deleteOccupationModal(record) }}><Icon type="delete" style={{ fontSize: "15px", color: "#6da9f6" }} /></Link>
        </span>
      )
    }
    ];
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 20,
          offset: 4,
        },
      },
    };

    getFieldDecorator('schoolKeys', { initialValue: [] });
    getFieldDecorator('collegeKeys', { initialValue: [] });
    getFieldDecorator('occupationKeys', { initialValue: [] });

    const schoolKeys = getFieldValue('schoolKeys');
    const collegeKeys = getFieldValue('collegeKeys');
    const occupationKeys = getFieldValue('occupationKeys');

    const schoolDetails = schoolKeys.map((k, index) => (
      <Row style={{ backgroundColor: "#e3e3e3" }}>
        <Col span={6}>
          <Form.Item
            label={`School Name ${index + 1}`}
            key={k}
          >
            {getFieldDecorator(`schoolName[${index + 1}]`, {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Enter School Name",
                },
              ],
            })(<Input placeholder="School name" style={{ width: '100%', marginRight: 8 }} />)}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label={`Degree`}
            key={k}
          >
            {getFieldDecorator(`schoolDegreeName[${index + 1}]`, {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Enter Degree name",
                },
              ],
            })(<Input placeholder="Degree name" style={{ width: '100%', marginRight: 8 }} />)}
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label={"Date of passing"}>
            {getFieldDecorator(`schoolPassDate[${index + 1}]`, {
              validateFirst: true,
              rules: [{
                required: true,
                message: "Enter Date of Passing"
              }],
            })(
              <DatePicker placeholder="Enter Date of passing" style={{ width: '100%' }} />
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label={"Address"}>
            {getFieldDecorator(`schoolAddress[${index + 1}]`, {
              validateFirst: true,
              rules: [{
                required: true,
                message: "Enter Address"
              }],
            })(<Input placeholder="Address" style={{ width: '100%', marginRight: 8 }} />)}
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item>
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.removeSchool(index + 1)}
              key={k}
            />
          </Form.Item>
        </Col>
      </Row>
    ));

    const collegeDetails = collegeKeys.map((k, index) => (
      <Row style={{ backgroundColor: "#e3e3e3" }}>
        <Col span={6}>
          <Form.Item
            label={`College Name ${index + 1}`}
            key={k}
          >
            {getFieldDecorator(`collegeName[${index + 1}]`, {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Enter college name",
                },
              ],
            })(<Input placeholder="College name" style={{ width: '100%', marginRight: 8 }} />)}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label={`Degree`}
            key={k}
          >
            {getFieldDecorator(`collegeDegreeName[${index + 1}]`, {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Enter degree",
                },
              ],
            })(<Input placeholder="Degree name" style={{ width: '100%', marginRight: 8 }} />)}
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label={"Date of passing"}>
            {getFieldDecorator(`collegePassDate[${index + 1}]`, {
              validateFirst: true,
              rules: [{
                required: true,
                message: "Enter Date of Passing"
              }],
            })(
              <DatePicker placeholder="Enter Date of passing" style={{ width: '100%' }} />
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label={"Address"}>
            {getFieldDecorator(`collegeAddress[${index + 1}]`, {
              validateFirst: true,
              rules: [{
                required: true,
                message: "Enter Address"
              }],
            })(<Input placeholder="Address" style={{ width: '100%', marginRight: 8 }} />)}
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item>
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.removeCollege(index + 1)}
              key={k}
            />
          </Form.Item>
        </Col>
      </Row>
    ));

    const occupationDetails = occupationKeys.map((k, index) => (
      <Row style={{ backgroundColor: "#e3e3e3" }}>
        <Col span={6}>
          <Form.Item
            label={`Occupation Name ${index + 1}`}
            key={k}
          >
            {getFieldDecorator(`occupationName[${index + 1}]`, {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Enter Occupation name",
                },
              ],
            })(<Input placeholder="Occupation name" style={{ width: '100%', marginRight: 8 }} />)}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label={`Position`}
            key={k}
          >
            {getFieldDecorator(`occupationPositionName[${index + 1}]`, {
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Enter Position",
                },
              ],
            })(<Input placeholder="Designation name" style={{ width: '100%', marginRight: 8 }} />)}
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label={"Date"}>
            {getFieldDecorator(`occupationLastDate[${index + 1}]`, {
              validateFirst: true,
              rules: [{
                required: true,
                message: "Enter date"
              }],
            })(
              <DatePicker placeholder="Date" style={{ width: '100%' }} />
            )}
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label={"Address"}>
            {getFieldDecorator(`occupationAddress[${index + 1}]`, {
              validateFirst: true,
              rules: [{
                required: true,
                message: "Enter Address"
              }],
            })(<Input placeholder="Address" style={{ width: '100%', marginRight: 8 }} />)}
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item>
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.removeOccupation(index + 1)}
              key={k}
            />
          </Form.Item>
        </Col>
      </Row>
    ));

    const uploadButton = (
      <div>
        <Avatar size={256} icon={this.state.loading ? 'loading' : 'plus'} style={{ backgroundColor: '#7fb439' }} />
        <div className="ant-upload-text"><IntlMessages id="create.user.upload.profile.image" /></div>
      </div>
    );

    const imageUrl = this.state.imageUrl;

    return (
      <PageStyle>
        <Spin spinning={this.state.loading}>
          <Form>
            <Row type="flex" justify="start" gutter={16}>
              <Col span={24}>
                <Form.Item>
                  {getFieldDecorator('userImage', {
                    valuePropName: 'file',
                    getValueFromEvent: this.normFile
                  })(
                    <div style={{ margin: '25px' }}>
                      <center>
                        <Upload
                          listType="picture-card"
                          className="avatar-uploader"
                          name='file'
                          customRequest={(e) => this.fileRequest(e)}
                          showUploadList={false}
                          beforeUpload={this.beforeUpload}
                        >
                          {imageUrl ?
                            <Avatar size={256} src={imageUrl} icon={this.state.loading ? 'loading' : 'plus'} style={{ backgroundColor: '#7fb439' }} alt="avatar" /> : uploadButton}
                        </Upload>
                        <div className="text-center">Recommened Image Size: 256x256pxls</div>
                      </center>
                    </div>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <hr style={{ border: "0.5px solid rgba(158, 158, 158, 0.2)", marginLeft: "-1px", marginRight: "0px" }}></hr>
            <Row type="flex" justify="start" gutter={16}>
              <Col span={8}>
                <Form.Item label={"AC Number"}>
                  {getFieldDecorator('acNumber', {
                    validateFirst: true,
                    rules: [{
                      required: false,
                      message: "Enter AC Number",
                    },
                    {
                      min: 1,
                      max: 3,
                      message: "Please enter valid AC Number"
                    }
                    ],
                  })(
                    <Input type="number" placeholder={"Enter AC Number"} onChange={() => this.setState({ disabled: false })} />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={"AC Name"}>
                  {getFieldDecorator('acName', {
                    validateFirst: true,
                    rules: [{
                      required: false,
                      message: "Enter AC Name",
                    },
                    {
                      required: false, pattern: new RegExp("^[a-zA-Z ]*$"), message: <IntlMessages id="error.numberSpecial" />
                    },
                    {
                      max: 30,
                      message: "Enter less than 30 characters"
                    }
                    ],
                  })(
                    <Input placeholder={"Enter AC Name"} onChange={() => this.setState({ disabled: false })} />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={"AC Part Number"}>
                  {getFieldDecorator('acPartNumber', {
                    validateFirst: true,
                    rules: [{
                      required: false,
                      message: "Enter AC Part Number",
                    },
                    {
                      min: 1,
                      max: 3,
                      message: "Please enter valid AC Part Number"
                    }
                    ],
                  })(
                    <Input type="number" placeholder={"Enter AC Part Number"} onChange={() => this.setState({ disabled: false })} />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={"AC Section Number"}>
                  {getFieldDecorator('acSectionNumber', {
                    validateFirst: true,
                    rules: [{
                      required: false,
                      message: "Enter AC Section Number",
                    },
                    {
                      min: 1,
                      max: 3,
                      message: "Please enter valid AC Section Number"
                    }
                    ],
                  })(
                    <Input type="number" placeholder={"Enter AC Section Number"} onChange={() => this.setState({ disabled: false })} />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={"AC Section Name"}>
                  {getFieldDecorator('acSectionName', {
                    validateFirst: true,
                    rules: [{
                      required: false,
                      message: "Enter AC Section Name",
                    },
                    {
                      required: false, pattern: new RegExp("^[a-zA-Z ]*$"), message: <IntlMessages id="error.numberSpecial" />
                    },
                    {
                      max: 30,
                      message: "Enter less than 30 characters"
                    }
                    ],
                  })(
                    <Input placeholder={"Enter AC Section Name"} onChange={() => this.setState({ disabled: false })} />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={"Section Serial Number"}>
                  {getFieldDecorator('sectionSerialNumber', {
                    validateFirst: true,
                    rules: [{
                      required: false,
                      message: "Enter Section Serial Number",
                    },
                    {
                      min: 1,
                      max: 4,
                      message: "Please enter valid Section Serail Number"
                    }
                    ],
                  })(
                    <Input type="number" placeholder={"Enter Section Serial Number"} onChange={() => this.setState({ disabled: false })} />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={"Name"}>
                  {getFieldDecorator('userName', {
                    validateFirst: true,
                    rules: [{
                      required: true,
                      message: "Enter Name",
                    },
                    {
                      required: true, pattern: new RegExp("^[a-zA-Z ]*$"), message: <IntlMessages id="error.numberSpecial" />
                    },
                    {
                      max: 30,
                      message: "Enter less than 30 characters"
                    }
                    ],
                  })(
                    <Input placeholder={"Enter Name"} onChange={() => this.setState({ disabled: false })} />
                  )}
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label={"Father / Husband Name"}>
                  {getFieldDecorator('familyName', {
                    validateFirst: true,
                    rules: [{
                      required: false,
                      message: <IntlMessages id="create.user.warning.last.name" />,
                    },
                    {
                      required: false, pattern: new RegExp("^[a-zA-Z ]*$"), message: <IntlMessages id="error.numberSpecial" />
                    },
                    {
                      max: 30,
                      message: "Enter less than 30 characters"
                    }
                    ],
                  })(
                    <Input placeholder="Enter Family Name" onChange={() => this.setState({ disabled: false })} />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={"Voter ID"}>
                  {getFieldDecorator('voterId', {
                    validateFirst: true,
                    rules: [{
                      required: true,
                      message: "Enter Voter Id",
                    },
                    {
                      required: true, pattern: new RegExp("^[A-Z]{3}[0-9]{7}$"), message: "Enter valid voter Id"
                    },
                    {
                      min: 10,
                      max: 10,
                      message: "Enter valid Voter ID"
                    }
                    ],
                  })(
                    <Input placeholder="Enter Voter ID" disabled={isEditUser} onChange={() => this.setState({ disabled: false })} />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={"Gender"}>
                  {getFieldDecorator('gender', {
                    validateFirst: true,
                    rules: [{
                      required: true,
                      message: <IntlMessages id="create.user.warning.last.name" />,
                    }
                    ],
                  })(
                    <Select placeholder="Select Gender" getPopupContainer={trigger => trigger.parentNode} style={{ width: '100%' }} >
                      <Option value={'Male'}>Male</Option>
                      <Option value={'Female'}>Female</Option>
                    </Select>)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={"Date of birth"}>
                  {getFieldDecorator('dob', {
                    validateFirst: true,
                    rules: [{
                      required: false,
                      message: "Enter Date of Birth"
                    }],
                  })(
                    <DatePicker placeholder="Enter Date of birth" style={{ width: '100%' }} />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={"Aadhar Number"}>
                  {getFieldDecorator('aadharNo', {
                    validateFirst: true,
                    rules: [{
                      required: false,
                      message: <IntlMessages id="create.user.warning.last.name" />,
                    },
                    {
                      required: false, pattern: new RegExp("^[0-9]*$"), message: <IntlMessages id="error.validNumber" />
                    },
                    {
                      min: 12,
                      max: 12,
                      message: "Enter valid aadhar number"
                    }
                    ],
                  })(
                    <Input type="number" placeholder="Enter Aadhar No." onChange={() => this.setState({ disabled: false })} />
                  )}
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label={<IntlMessages id="create.user.email" />}>
                  {getFieldDecorator('email', {
                    rules: [{
                      type: 'email', message: <IntlMessages id="create.user.error.email" />,
                    }],
                  })(
                    <Input placeholder="E-mail" onChange={() => this.setState({ disabled: false })} />
                  )}
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label={`Primary phnone number`}
                >
                  {getFieldDecorator(`primaryPhoneNo`, {
                    rules: [{
                      required: false,
                      message: <IntlMessages id="create.user.warning.phone" />
                    }, {
                      min: 10,
                      max: 10,
                      message: <IntlMessages id="error.validNumber" />
                    }
                    ],
                  })(<Input placeholder="Primary Phone" style={{ width: '100%', marginRight: 8 }} />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={`Secondary phone number`}
                >
                  {getFieldDecorator(`secondaryPhoneNo`, {
                    rules: [{
                      required: false,
                      message: <IntlMessages id="create.user.warning.phone" />
                    }, {
                      min: 10,
                      max: 10,
                      message: <IntlMessages id="error.validNumber" />
                    }
                    ],
                  })(<Input placeholder="Secondary Phone" style={{ width: '100%', marginRight: 8 }} />)}
                </Form.Item>
              </Col>
              {isEditUser && <Col span={24}>
                <Form.Item label={"Relation Details"}>
                  <Button type="dashed" onClick={() => this.fetchRelations()} style={{ width: '100%' }}>
                    Fetch Relations
                  </Button>
                </Form.Item>
              </Col>}
              {this.state.relationData && this.state.relationData.length > 0 && isEditUser && <Col span={24}>
                <Table columns={columns} dataSource={this.state.relationData} rowKey="id" pagination={false} />
              </Col>}
              {isEditUser && <Col span={24}>
                <Form.Item label={"Fetch School Details"}>
                  <Button type="dashed" onClick={() => this.fetchSchools()} style={{ width: '100%' }}>
                    Fetch Schools
                  </Button>
                </Form.Item>
              </Col>}
              {this.state.schoolData && this.state.schoolData.length > 0 && isEditUser && <Col span={24}>
                <Table columns={schoolColumns} dataSource={this.state.schoolData} rowKey="id" pagination={false} />
              </Col>}
              <Col span={24}>
                <Form.Item label={"School Details"}>
                  <Button type="dashed" onClick={this.addSchool} style={{ width: '100%' }}>
                    <Icon type="plus" /> Add School Details
                  </Button>
                </Form.Item>
                {schoolDetails}
              </Col>
              {isEditUser && <Col span={24}>
                <Form.Item label={"Fetch College Details"}>
                  <Button type="dashed" onClick={() => this.fetchColleges()} style={{ width: '100%' }}>
                    Fetch Colleges
                  </Button>
                </Form.Item>
              </Col>}
              {this.state.collegeData && this.state.collegeData.length > 0 && isEditUser && <Col span={24}>
                <Table columns={collegeColumns} dataSource={this.state.collegeData} rowKey="id" pagination={false} />
              </Col>}
              <Col span={24}>
                <Form.Item label={"College Details"}>
                  <Button type="dashed" onClick={this.addCollege} style={{ width: '100%' }}>
                    <Icon type="plus" /> Add College Details
                  </Button>
                </Form.Item>
                {collegeDetails}
              </Col>
              {isEditUser && <Col span={24}>
                <Form.Item label={"Fetch Occupation Details"}>
                  <Button type="dashed" onClick={() => this.fetchOccupations()} style={{ width: '100%' }}>
                    Fetch Occupations
                  </Button>
                </Form.Item>
              </Col>}
              {this.state.occupationData && this.state.occupationData.length > 0 && isEditUser && <Col span={24}>
                <Table columns={occupationColumns} dataSource={this.state.occupationData} rowKey="id" pagination={false} />
              </Col>}
              <Col span={24}>
                <Form.Item label={"Occupation Details"}>
                  <Button type="dashed" onClick={this.addOccupation} style={{ width: '100%' }}>
                    <Icon type="plus" /> Add Occupation Details
                  </Button>
                </Form.Item>
                {occupationDetails}
              </Col>
              <Row>
                <Col span={8}>
                  <Form.Item label={"House Number"}>
                    {getFieldDecorator('houseNo', {
                      validateFirst: true,
                      rules: [
                        {
                          max: 30,
                          message: "Enter less than 30 characters"
                        }
                      ],
                    })(
                      <Input placeholder="Enter House no." onChange={() => this.setState({ disabled: false })} />
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label={"Mohalla"}>
                    {getFieldDecorator('mohalla', {
                      validateFirst: true,
                      rules: [
                        {
                          max: 30,
                          message: "Enter less than 30 characters"
                        }
                      ],
                    })(
                      <Input placeholder="Enter Mohalla name" onChange={() => this.setState({ disabled: false })} />
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label={"Village"}>
                    {getFieldDecorator('village', {
                      validateFirst: true,
                      rules: [
                        {
                          max: 30,
                          message: "Enter less than 30 characters"
                        }
                      ],
                    })(
                      <Input placeholder="Enter Village Name" onChange={() => this.setState({ disabled: false })} />
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label={"Ward"}>
                    {getFieldDecorator('ward', {
                      validateFirst: true,
                      rules: [
                        {
                          max: 30,
                          message: "Enter less than 30 characters"
                        }
                      ],
                    })(
                      <Input placeholder="Enter Ward name" onChange={() => this.setState({ disabled: false })} />
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label={"Panchayat"}>
                    {getFieldDecorator('panchayat', {
                      validateFirst: true,
                      rules: [
                        {
                          max: 30,
                          message: "Enter less than 30 characters"
                        }
                      ],
                    })(
                      <Input placeholder="Enter panchayat name" onChange={() => this.setState({ disabled: false })} />
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label={"Block"}>
                    {getFieldDecorator('block', {
                      validateFirst: true,
                      rules: [
                        {
                          max: 30,
                          message: "Enter less than 30 characters"
                        }
                      ],
                    })(
                      <Input placeholder="Enter block name" onChange={() => this.setState({ disabled: false })} />
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label={"Tehsil"}>
                    {getFieldDecorator('tehsil', {
                      validateFirst: true,
                      rules: [
                        {
                          max: 30,
                          message: "Enter less than 30 characters"
                        }
                      ],
                    })(
                      <Input placeholder="Enter Tehsil name" onChange={() => this.setState({ disabled: false })} />
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label={"District"}>
                    {getFieldDecorator('district', {
                      validateFirst: true,
                      rules: [
                        {
                          max: 30,
                          message: "Enter less than 30 characters"
                        }
                      ],
                    })(
                      <Input placeholder="Enter District name" onChange={() => this.setState({ disabled: false })} />
                    )}
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label={"Social Media"}>
                    {getFieldDecorator('hasSocialMedia', {
                      valuePropName: 'checked'
                    })(
                      <Switch onChange={() => this.setState({ disabled: false })} />
                    )}
                  </Form.Item>
                </Col>
                {getFieldValue('hasSocialMedia') &&
                  <>
                    <Col span={8}>
                      <Form.Item label={"Twitter Details"}>
                        {getFieldDecorator('twitterId', {
                          validateFirst: true,
                          rules: [
                            {
                              max: 30,
                              message: "Enter less than 30 characters"
                            }
                          ],
                        })(
                          <Input placeholder="Enter Twitter Id" onChange={() => this.setState({ disabled: false })} />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label={"Facebook Details"}>
                        {getFieldDecorator('facebookId', {
                          validateFirst: true,
                          rules: [
                            {
                              max: 30,
                              message: "Enter less than 30 characters"
                            }
                          ],
                        })(
                          <Input placeholder="Enter Facebook Id" onChange={() => this.setState({ disabled: false })} />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item label={"Instagram Details"}>
                        {getFieldDecorator('instaId', {
                          validateFirst: true,
                          rules: [
                            {
                              max: 30,
                              message: "Enter less than 30 characters"
                            }
                          ],
                        })(
                          <Input placeholder="Enter Insta Id" onChange={() => this.setState({ disabled: false })} />
                        )}
                      </Form.Item>
                    </Col>
                  </>
                }
              </Row>
              <Col span={6}>
                <Form.Item label={"GR"}>
                  {getFieldDecorator('grField', {
                  })(
                    <Input placeholder="Enter GR" onChange={() => this.setState({ disabled: false })} />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={"Bank Name"}>
                  {getFieldDecorator('bankName', {
                  })(
                    <Input placeholder="Enter Bank Name" onChange={() => this.setState({ disabled: false })} />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={"Bank Account Number"}>
                  {getFieldDecorator('bankAccountNumber', {
                    validateFirst: true,
                    rules: [{
                      required: false,
                      message: "Bank Account Number",
                    },
                    {
                      min: 8,
                      max: 12,
                      message: "Please enter valid Bank Account Number"
                    }
                    ],
                  })(
                    <Input type="number" placeholder={"Bank Account Number"} onChange={() => this.setState({ disabled: false })} />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={"Bank IFSC Code"}>
                  {getFieldDecorator('ifscCode', {
                  })(
                    <Input placeholder="Enter IFSC Code" onChange={() => this.setState({ disabled: false })} />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={"Been to south Kashmir with purpose"}>
                  {getFieldDecorator('visitedSouthKashmir', {
                    valuePropName: 'checked'
                  })(
                    <Switch onChange={() => this.setState({ disabled: false })} />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={"Been to pak/held visa"}>
                  {getFieldDecorator('visitedPak', {
                    valuePropName: 'checked'
                  })(
                    <Switch onChange={() => this.setState({ disabled: false })} />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={"Been OGW/ST/Stone pelter /drug smuggler"}>
                  {getFieldDecorator('beenOGW', {
                    valuePropName: 'checked'
                  })(
                    <Switch onChange={() => this.setState({ disabled: false })} />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={"Arrested ever for any incident"}>
                  {getFieldDecorator('wasArrested', {
                    valuePropName: 'checked'
                  })(
                    <Switch onChange={() => this.setState({ disabled: false })} />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={"Political affiliation"}>
                  {getFieldDecorator('politicalAffiliation', {
                    valuePropName: 'checked'
                  })(
                    <Switch onChange={() => this.setState({ disabled: false })} />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={"Masjid frequently attended"}>
                  {getFieldDecorator('visitedMasjid', {
                    valuePropName: 'checked'
                  })(
                    <Switch onChange={() => this.setState({ disabled: false })} />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={"Any association with Army/SF agencies"}>
                  {getFieldDecorator('associatedWithArmy', {
                    valuePropName: 'checked'
                  })(
                    <Switch onChange={() => this.setState({ disabled: false })} />
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label={"Relatives in POK"}>
                  {getFieldDecorator('hasPOKRelatives', {
                    valuePropName: 'checked'
                  })(
                    <Switch onChange={() => this.setState({ disabled: false })} />
                  )}
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label={"Comander comments"}>
                  {getFieldDecorator('comments', {
                  })(
                    <TextArea rows={4} />
                  )}
                </Form.Item>
              </Col>
            </Row>

            <hr style={{ border: "0.5px solid rgba(158, 158, 158, 0.2)", marginLeft: "-1px", marginRight: "0px" }}></hr>
            <Form.Item className="alignRight footer-buttons" {...tailFormItemLayout}>
              <Button style={{ marginRight: '20px' }} onClick={() => this.reset()}>
                <IntlMessages id="create.user.btn.reset" /> <Icon type="reload" />
              </Button>
              <Button type="primary" htmlType="submit" loading={loading} onClick={(e) => this.handleSubmit(e)}>
                {isEditUser && <span><IntlMessages id="create.user.btn.update" /></span>}{!isEditUser && <span><IntlMessages id="create.user.btn.create" /></span>} <Icon type="right" />
              </Button>
            </Form.Item>
          </Form>
        </Spin>
        <Modal
          visible={this.state.showRelationModal}
          title="DELETE RELATION"
          width="600px"
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.deleteRelation}>
              DELETE
            </Button>
          ]}
        >
          <Spin spinning={this.props.user.emailDataLoader}>
            {`Are you sure you want to delete the relation ${this.state.relationName}?`}
          </Spin>
        </Modal>
        <Modal
          visible={this.state.showSchoolModal}
          title="DELETE SCHOOL"
          width="600px"
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.deleteSchool}>
              DELETE
            </Button>
          ]}
        >
          <Spin spinning={this.props.user.emailDataLoader}>
            {`Are you sure you want to delete the school ${this.state.schoolName}?`}
          </Spin>
        </Modal>
        <Modal
          visible={this.state.showCollegeModal}
          title="DELETE COLLEGE"
          width="600px"
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.deleteCollege}>
              DELETE
            </Button>
          ]}
        >
          <Spin spinning={this.props.user.emailDataLoader}>
            {`Are you sure you want to delete the college ${this.state.collegeName}?`}
          </Spin>
        </Modal>
        <Modal
          visible={this.state.showOccupationModal}
          title="DELETE OCCUPATION"
          width="600px"
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.deleteOccupation}>
              DELETE
            </Button>
          ]}
        >
          <Spin spinning={this.props.user.emailDataLoader}>
            {`Are you sure you want to delete the occupation ${this.state.occupationName}?`}
          </Spin>
        </Modal>
      </PageStyle>
    );
  }
}

const actionCreators = {
  createUser,
  updateExistingUserData,
  updateUserData,
  getUserList,
  deleteRelation,
  getActiveRoleList,
  fetchAllRelations,
  saveRelation,
  fetchSchools,
  fetchColleges,
  fetchOccupations,
  deleteSchool,
  deleteCollege,
  deleteOccupation,
  validateVoterId
}

const mapStateToProps = (state) => {
  return {
    global: state.global,
    user: state.user
  };
};

const WrappedRegistrationForm = Form.create()(UserForm);

export default withRouter(connect(mapStateToProps, actionCreators)(WrappedRegistrationForm));