import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Card, Icon, Table, Switch, notification, Modal, Input, Row, Col, Spin, Button } from 'antd';
import UserForm from './userForm';
import '../../assets/styles/card.css';
import { getUserList, updateExistingUserStatus, updateUserData, deleteUser } from "../../redux/actions/user";
import IntlMessages from '../../utils/IntlMessages';
import PageStyle from './pageStyle';
import Filter from '../../assets/images/claimProject/Filter';
import intlUni from 'react-intl-universal';
import Highlighter from 'react-highlight-words';
import AdvanceFilter from './advanceFilter';
const duration = parseInt(process.env.REACT_APP_NOTIFICATION_DURATION);

const { Search } = Input;

class ManageUser extends React.Component {
  state = {
    loading: false,
    cardLoadingStatus: false,
    deleteUserModal: false,
    userName: ""
  };

  componentDidMount() {
    this.setState({ cardLoadingStatus: true });
    this.props.getUserList().then(() => { this.setState({ cardLoadingStatus: false }); });
  }
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  reRoute = () => {
    this.props.history.push({
      pathname: `${process.env.REACT_APP_LINK_TO_PATH}User/CreateUser`
    });
  }


  editUser = (data) => {
    this.showModal(data);
  }

  showModal = (data) => {
    this.props.updateUserData({ isEditUser: true, userFormData: data, emailDataLoader: true, displayDefault: false });
    this.reRoute();
  }

  showDeleteUserModal = (record) => {
    this.setState({
      voterId: record.voterId,
      userName: record.name,
      deleteUserModal: true
    });
  }

  deleteUser = () => {
    const obj = {
      voterId: this.state.voterId
    }
    this.props.deleteUser(obj).then(() => {
      this.props.getUserList().then(() => {
        this.setState({
          cardLoadingStatus: false,
          voterId: "",
          deleteUserModal: false,
          userName: ""
        });
        notification.success({
          message: 'User deleted successfully',
          duration: 3
        });
      });

    })
  }

  componentWillUnmount() {
    this.props.updateUserData({
      openAdvanceFilter: false
    });
  }

  handleCancel = () => {
    this.setState({
      cardLoadingStatus: false,
      voterId: "",
      deleteUserModal: false,
      userName: ""
    });
  }

  onUserSearch = (value) => {
    this.setState({
      loading: true
    });
    this.props.updateUserData({ searchKey: value });
    this.props.getUserList(value).then(() => {
      this.setState({
        loading: false
      })
    });
  }

  render() {
    const { cardLoadingStatus, loading } = this.state;
    const { totalClaimGroups, mode, openAdvanceFilter, loadedRecords, totalRecords } = this.props.user;

    const columns = [{
      title: "Name",
      dataIndex: 'name',
      key: 'name',
      ...this.getColumnSearchProps('name'),
    },
    {
      title: "Voter Id",
      dataIndex: 'voterId',
      key: 'voterId',
      ...this.getColumnSearchProps('voterId')
    },
    {
      title: "Aadhar No",
      dataIndex: 'aadharCardNo',
      key: 'aadharCardNo',
      ...this.getColumnSearchProps('aadharCardNo')
    },
    {
      title: "Primary Phone No",
      dataIndex: 'primaryPhoneNo',
      key: 'primaryPhoneNo',
      ...this.getColumnSearchProps('primaryPhoneNo')
    },
    {
      title: "Secondary Phone No",
      dataIndex: 'secondaryPhoneNo',
      key: 'secondaryPhoneNo',
      ...this.getColumnSearchProps('secondaryPhoneNo')
    },
    {
      title: "DOB",
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
    },
    {
      title: "Family Name",
      dataIndex: 'familyName',
      key: 'familyName',
      ...this.getColumnSearchProps('familyName')
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
        <>
          <span className='actionButtons'>
            <Link to="#" onClick={() => { this.editUser(record) }}><Icon type="edit" style={{ fontSize: "15px", color: "#6da9f6" }} /></Link>
          </span>
          <span>
            <Link to="#" onClick={() => { this.showDeleteUserModal(record) }}><Icon type="delete" style={{ fontSize: "15px", color: "#6da9f6" }} /></Link>
          </span>
        </>
      )
    }];

    return (
      <PageStyle>
        <Card className="indegeneCard" title={<IntlMessages id="user.management.manage.user" />} loading={cardLoadingStatus}>
          <Row className="searchLabelContainer">
            <Col xxl={22} xl={22} lg={22} md={22} sm={22} xs={22}>
              <Search
                placeholder={intlUni.get("search.fullname.placeholder")}
                onChange={e => this.props.updateUserData({ searchKey: e.target.value })}
                onSearch={value => this.onUserSearch(value)}
              />
            </Col>
            <Col xxl={2} xl={2} lg={2} md={2} sm={2} xs={2}>
              <div className="filterContainer" onClick={() => { this.props.updateUserData({ openAdvanceFilter: true }) }}>
                <Filter />
              </div>
            </Col>
          </Row>
          {openAdvanceFilter &&
            <Row className="assetFilter">
              <AdvanceFilter />
            </Row>
          }
          <Table {...this.state} columns={columns} dataSource={this.props.user.userList} rowKey="id" />
          <Modal
            visible={this.state.deleteUserModal}
            title="DELETE USER"
            width="600px"
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" loading={loading} onClick={this.deleteUser}>
                DELETE
              </Button>
            ]}
          >
            <Spin spinning={this.props.user.emailDataLoader}>
              {`Are you sure you want to delete the user ${this.state.userName}?`}
            </Spin>
          </Modal>
        </Card>
      </PageStyle>
    );
  }
}

const actionCreators = {
  getUserList,
  updateExistingUserStatus,
  updateUserData,
  deleteUser
}

const mapStateToProps = (state) => {
  return {
    global: state.global,
    user: state.user
  };
};

export default withRouter(connect(mapStateToProps, actionCreators)(ManageUser));
