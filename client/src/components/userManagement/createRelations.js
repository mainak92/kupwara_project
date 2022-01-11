import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Card, Icon, Table, Switch, notification, Select, Input, Row, Col, Spin, Button } from 'antd';
import UserForm from './userForm';
import '../../assets/styles/card.css';
import { getUserList, updateExistingUserStatus, updateUserData, saveRelation } from "../../redux/actions/user";
import IntlMessages from '../../utils/IntlMessages';
import PageStyle from './pageStyle';
import Filter from '../../assets/images/claimProject/Filter';
import intlUni from 'react-intl-universal';
import Highlighter from 'react-highlight-words';
import AdvanceFilter from './advanceFilter';
const duration = parseInt(process.env.REACT_APP_NOTIFICATION_DURATION);

const { Search } = Input;

class CreaeRelations extends React.Component {
    state = {
        loading: false,
        cardLoadingStatus: false,
        voterId: "",
        relativeVoterId: "",
        forUserResult: [],
        toUserResult: [],
        relationType: ""
    };

    componentDidMount() {
        // this.setState({ cardLoadingStatus: true });
        // this.props.getUserList().then(() => { this.setState({ cardLoadingStatus: false }); });
    }


    editUser = (data) => {
        this.showModal(data);
    }

    showModal = (data) => {
        this.props.updateUserData({ isEditUser: true, userFormData: data, emailDataLoader: true, displayDefault: false });
        this.reRoute();
    }

    componentWillUnmount() {
        // this.props.updateUserData({
        //     openAdvanceFilter: false
        // });
    }



    addRelations = () => {
        const { relationType, forUserResult, toUserResult } = this.state;

        if (this.state.toUserResult && this.state.toUserResult.length > 0) {
            const obj = {
                relationType,
                personVoterId: forUserResult[0].voterId,
                relationVoterId: toUserResult[0].voterId,
                relationName: toUserResult[0].name,
                relationDob: toUserResult[0].dateOfBirth,
                houseNo: toUserResult[0].houseNo,
                mohalla: toUserResult[0].mohalla,
                district: toUserResult[0].district,
                village: toUserResult[0].village,
                ward: toUserResult[0].ward,
                panchayat: toUserResult[0].panchayat,
                tehsil: toUserResult[0].tehsil,
                block: toUserResult[0].block
            }
            this.props.saveRelation(obj).then(() => {
                notification.success({
                    message: "Relation Added Successfully",
                    duration: 3
                });
                this.setState({
                    relativeVoterId: "",
                    toUserResult: []
                });
            });
        }
        else {
            notification.error({
                message: "Please search for the entered aadhar number",
                duration: 3
            })
        }
    }

    forUser = (voterId) => {
        this.props.getUserList(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, voterId, undefined).then((res) => {
            this.setState({ forUserResult: res })
        })
    }

    toUser = (relationVoterId) => {
        this.props.getUserList(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, relationVoterId, undefined).then((res) => {
            this.setState({ toUserResult: res })
        })
    }

    selectRelation = (e) => {
        this.setState({
            relationType: e
        });
    }
    render() {
        const { cardLoadingStatus, loading } = this.state;

        const columns = [{
            title: "Name",
            dataIndex: 'name',
            key: 'name',
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
            title: "Family Name",
            dataIndex: 'familyName',
            key: 'familyName',
        }, {
            title: "DOB",
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
        },
        {
            title: "Address",
            dataIndex: 'address',
            key: 'address',
            width: "20%",
            render: (value, record) => {
                return `House No: ${record.houseNo}, Mohalla: ${record.mohalla}, Village: ${record.village}, Ward: ${record.ward}, Panchayat: ${record.panchayat}, Block: ${record.block}, Tehsil: ${record.tehsil}, District: ${record.district}`
            }
        }
        ];

        return (
            <PageStyle>
                <Card className="indegeneCard" title="Add Relations" loading={cardLoadingStatus}>
                    <Row className="searchLabelContainer" gutter={16} type='flex'>
                        <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={8}>
                            <h4>Search for user you want to add relations</h4>
                            <Search
                                placeholder="Enter voter Id"
                                style={{ width: '100%' }}
                                onChange={e => this.setState({ voterId: e.target.value })}
                                onSearch={value => this.forUser(value)}
                            />
                        </Col>
                    </Row>
                    <Row className="searchLabelContainer" gutter={16} type='flex'>
                        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                            {this.state.forUserResult && this.state.forUserResult.length > 0 && <Table {...this.state} columns={columns} dataSource={this.state.forUserResult} rowKey="id" pagination={false} />}
                        </Col>
                    </Row>

                    <Row className="searchLabelContainer" gutter={16} type='flex'>
                        <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={8}>
                            <h4>Select relation you want to add for above user</h4>
                            <Select placeholder="Select Relation" getPopupContainer={trigger => trigger.parentNode} style={{ width: '100%' }} onChange={(e) => this.selectRelation(e)}>
                                <Option value={'father'}>Father</Option>
                                <Option value={'mother'}>Mother</Option>
                                <Option value={'brother'}>Brother</Option>
                                <Option value={'sister'}>Sister</Option>
                                <Option value={'son'}>Son</Option>
                                <Option value={'daughter'}>Daughter</Option>
                                <Option value={'husband'}>Husband</Option>
                                <Option value={'wife'}>Wife</Option>
                                <Option value={'friend'}>Friend</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row className="searchLabelContainer" gutter={16} type='flex'>
                        <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={8}>
                            <h4>Search for user who will be related.</h4>
                            <Search
                                placeholder="Enter voter Id"
                                style={{ width: '100%' }}
                                onChange={e => this.setState({ relativeVoterId: e.target.value })}
                                value={this.state.relativeVoterId}
                                onSearch={value => this.toUser(value)}
                            />
                        </Col>
                    </Row>
                    <Row className="searchLabelContainer" gutter={16} type='flex'>
                        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                            {this.state.toUserResult && this.state.toUserResult.length > 0 && <Table {...this.state} columns={columns} dataSource={this.state.toUserResult} rowKey="id" pagination={false} />}
                        </Col>
                    </Row>

                    <Col xxl={8} xl={8} lg={8} md={8} sm={8} xs={8}>
                        <Button type="primary searchLabelContainer" disabled={this.state.relativeVoterId === ""} onClick={() => this.addRelations()}>ADD</Button>
                    </Col>
                </Card>
            </PageStyle>
        );
    }
}

const actionCreators = {
    getUserList,
    updateExistingUserStatus,
    updateUserData,
    saveRelation
}

const mapStateToProps = (state) => {
    return {
        global: state.global,
        user: state.user
    };
};

export default withRouter(connect(mapStateToProps, actionCreators)(CreaeRelations));
