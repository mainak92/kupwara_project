import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Row, Col, DatePicker, Select, Form, Button, Card, Tag, Tooltip, Input, Switch } from 'antd';
import PageStyle from './pageStyle';
import IntlMessages from '../../utils/IntlMessages';
import intlUni from 'react-intl-universal';
import { getUserList, updateExistingUserStatus, updateUserData } from "../../redux/actions/user";


const { RangePicker } = DatePicker;
const Option = Select.Option;

import { updateProjectClaimsData, getProjectClaimsMasterData, viewAllClaimGroups, getPMAllocationMasterData, getSubCategory, getRequestType } from "../../redux/actions/claimProject";

class advanceFilter extends Component {
	state = {
		dataLoading: false,
		callFilter: false,
		callReset: false
	}

	componentDidMount() {
		// this.props.getProjectClaimsMasterData();
		// this.props.getSubCategory();
		// this.props.getRequestType();
	}

	onFilterClose = (e) => {
		this.props.form.resetFields();
		this.props.updateUserData({ openAdvanceFilter: false })
	}

	resetFilterValues = () => {
		if (this.props.user.openAdvanceFilter) {
			this.props.form.resetFields();
			this.setState({ callReset: true });
			// this.props.updateProjectClaimsData({ countryIds: [], channelIds: [], subChannelIds: [], requestTypeIds: [], fromDate: '', toDate: '', onAdvanceFilter: false, complexityIds: [], regionIds: [] })
			this.setState({ callReset: false });
			this.props.getUserList(this.props.user.searchKey).then(() => {
				this.setState({ callFilter: false });
			});
		}
	}

	applyFilter = () => {
		this.setState({ callFilter: true });
		this.props.updateUserData({ openAdvanceFilter: true, onTextFilter: false, searchText: '' });
		let { primaryPhoneNo, secondaryPhoneNo, familyName, aadharNo, village, block, mohalla, voterId, grField } = this.props.form.getFieldsValue(['primaryPhoneNo', 'secondaryPhoneNo', 'familyName', 'aadharNo', 'village', 'block', 'mohalla', 'voterId', 'grField']);
		let { searchKey } = this.props.user;
		// const obj = {
		// 	totalRecordsPerPage: 10,
		// 	viewGroupFilterOptionVO: {
		// 		countries: (countryIds && countryIds.length) ? countryIds.map((country) => country.key) : [],
		// 		categories: (channelIds && channelIds.length) ? channelIds.map((item) => item.key) : [],
		// 		subCategories: (subChannelIds && subChannelIds.length) ? subChannelIds.map((item) => item.key) : [],
		// 		regions: (regionIds && regionIds.length) ? regionIds.map((item) => item.key) : [],
		// 		requestTypes: (requestTypeIds && requestTypeIds.length) ? requestTypeIds.map((item) => item.key) : [],
		// 		complexities: (complexityIds && complexityIds.length) ? complexityIds.map((item) => item.key) : [],
		// 		projectManagers: (projectManagerIds && projectManagerIds.length) ? projectManagerIds.map((item) => item.key) : []
		// 	},
		// 	loadedRecords: 0,
		// 	locale: this.props.global.locale,
		// 	searchCategoryName: searchKey
		// };

		this.props.getUserList(searchKey, primaryPhoneNo, secondaryPhoneNo, familyName, aadharNo, village, block, mohalla, voterId, grField).then(() => {
			this.setState({ callFilter: false });
		});
	}

	// handleClose = (id, ids, idKey, propKey) => {
	// 	const selVals = ids.filter(idsId => idsId.key !== id.key)
	// 	this.props.updateProjectClaimsData({ [idKey]: selVals })
	// 	this.props.form.setFieldsValue({
	// 		[propKey]: selVals
	// 	})
	// }

	render() {
		const { callFilter, callReset } = this.state;
		const { getFieldDecorator } = this.props.form;
		const dateFormat = process.env.DATE_FORMAT;

		return (
			<PageStyle>
				<Card className="advanceFilter"
					extra={<Icon type="close" onClick={(e) => { this.onFilterClose(e) }} style={{ fontSize: '16px', color: '#6b6b6b' }} />}
				>
					<Row gutter={20} type="flex" justify="start">
						<Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12} style={{ padding: '0 5px 0 5px' }}>
							<Form.Item label={"Voter Id"}>
								{getFieldDecorator('voterId', {})(
									<Input placeholder="Enter Voter Id" onChange={() => this.setState({ disabled: false })} />
								)}
							</Form.Item>
						</Col>
						<Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12} style={{ padding: '0 5px 0 5px' }}>
							<Form.Item label={"Aadhar Number"}>
								{getFieldDecorator('aadharNo', {})(
									<Input type="number" placeholder="Enter Aadhar No." onChange={() => this.setState({ disabled: false })} />
								)}
							</Form.Item>
						</Col>
						<Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12} style={{ padding: '0 5px 0 5px' }}>
							<Form.Item label={"Primary Phone Number"}>
								{getFieldDecorator('primaryPhoneNo', {})(
									<Input type="number" placeholder="Primary Phone No." onChange={() => this.setState({ disabled: false })} />
								)}
							</Form.Item>
						</Col>
						<Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12} style={{ padding: '0 5px 0 5px' }}>
							<Form.Item label={"Secondary Phone Number"}>
								{getFieldDecorator('secondaryPhoneNo', {})(
									<Input type="number" placeholder="Secondary Phone No." onChange={() => this.setState({ disabled: false })} />
								)}
							</Form.Item>
						</Col>
						<Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12} style={{ padding: '0 5px 0 5px' }}>
							<Form.Item label={"Family Name"}>
								{getFieldDecorator('familyName', {})(
									<Input placeholder="Enter Family Name" onChange={() => this.setState({ disabled: false })} />
								)}
							</Form.Item>
						</Col>
						<Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12} style={{ padding: '0 5px 0 5px' }}>
							<Form.Item label={"Village"}>
								{getFieldDecorator('village', {})(
									<Input placeholder="Village name" onChange={() => this.setState({ disabled: false })} />
								)}
							</Form.Item>
						</Col>
						<Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12} style={{ padding: '0 5px 0 5px' }}>
							<Form.Item label={"Block"}>
								{getFieldDecorator('block', {})(
									<Input placeholder="Block name" onChange={() => this.setState({ disabled: false })} />
								)}
							</Form.Item>
						</Col>
						<Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12} style={{ padding: '0 5px 0 5px' }}>
							<Form.Item label={"Mohalla"}>
								{getFieldDecorator('mohalla', {})(
									<Input placeholder="Mohalla name" onChange={() => this.setState({ disabled: false })} />
								)}
							</Form.Item>
						</Col>
						<Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12} style={{ padding: '0 5px 0 5px' }}>
							<Form.Item label={"GR"}>
								{getFieldDecorator('grField', {})(
									<Input placeholder="GR name" onChange={() => this.setState({ disabled: false })} />
								)}
							</Form.Item>
						</Col>
						{/* <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24} style={{ padding: '0 5px 0 10px' }}>
							<Form.Item label={"Been to south Kashmir with purpose"}>
								{getFieldDecorator('visitedSouthKashmir', {
									valuePropName: 'checked'
								})(
									<Switch onChange={() => this.setState({ disabled: false })} />
								)}
							</Form.Item>
						</Col>
						<Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24} style={{ padding: '0 5px 0 10px' }}>
							<Form.Item label={"Been to pak/held visa"}>
								{getFieldDecorator('visitedPak', {
									valuePropName: 'checked'
								})(
									<Switch onChange={() => this.setState({ disabled: false })} />
								)}
							</Form.Item>
						</Col>
						<Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12} style={{ padding: '0 5px 0 5px' }}>
							<Form.Item label={"Been OGW/ST/Stone pelter /drug smuggler"}>
								{getFieldDecorator('beenOGW', {
									valuePropName: 'checked'
								})(
									<Switch onChange={() => this.setState({ disabled: false })} />
								)}
							</Form.Item>
						</Col>
						<Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12} style={{ padding: '0 5px 0 5px' }}>
							<Form.Item label={"Arrested ever for any incident"}>
								{getFieldDecorator('wasArrested', {
									valuePropName: 'checked'
								})(
									<Switch onChange={() => this.setState({ disabled: false })} />
								)}
							</Form.Item>
						</Col>
						<Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12} style={{ padding: '0 5px 0 5px' }}>
							<Form.Item label={"Political affiliation"}>
								{getFieldDecorator('politicalAffiliation', {
									valuePropName: 'checked'
								})(
									<Switch onChange={() => this.setState({ disabled: false })} />
								)}
							</Form.Item>
						</Col>
						<Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12} style={{ padding: '0 5px 0 5px' }}>
							<Form.Item label={"Masjid frequently attended"}>
								{getFieldDecorator('visitedMasjid', {
									valuePropName: 'checked'
								})(
									<Switch onChange={() => this.setState({ disabled: false })} />
								)}
							</Form.Item>
						</Col>
						<Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12} style={{ padding: '0 5px 0 5px' }}>
							<Form.Item label={"Any association with Army/SF agencies"}>
								{getFieldDecorator('associatedWithArmy', {
									valuePropName: 'checked'
								})(
									<Switch onChange={() => this.setState({ disabled: false })} />
								)}
							</Form.Item>
						</Col>
						<Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12} style={{ padding: '0 5px 0 5px' }}>
							<Form.Item label={"Relatives in POK"}>
								{getFieldDecorator('hasPOKRelatives', {
									valuePropName: 'checked'
								})(
									<Switch onChange={() => this.setState({ disabled: false })} />
								)}
							</Form.Item>
						</Col> */}
					</Row>
					<hr className="advance-filter-hr"></hr>
					{/* {(channelIds.length > 0 || subChannelIds.length > 0 || requestTypeIds.length > 0 || countryIds.length > 0 || complexityIds.length > 0 || regionIds.length > 0 || projectManagerIds.length > 0) &&
						<div>
							<span><strong>{intlUni.get('asset.filters.applied')} | </strong></span>
							{channelIds.map((channel, index) => {
								return <Tag color="#27a9e0" className="asset-tag" closable={true} key={channel.key} onClose={() => this.handleClose(channel, channelIds, 'channelIds', 'channelIds')}>
									{channel.label}
								</Tag>;
							})}
							{subChannelIds.map((item, index) => {
								return <Tag color="#27a9e0" className="asset-tag" closable={true} key={item.key} onClose={() => this.handleClose(item, subChannelIds, 'subChannelIds', 'subChannelIds')}>
									{item.label}
								</Tag>;
							})}
							{requestTypeIds.map((item, index) => {
								return <Tag color="#27a9e0" className="asset-tag" closable={true} key={item.key} onClose={() => this.handleClose(item, requestTypeIds, 'requestTypeIds', 'requestTypeIds')}>
									{item.label}
								</Tag>;
							})}
							{regionIds.map((region, index) => {
								return <Tag color="#27a9e0" className="asset-tag" closable={true} key={region.key} onClose={() => this.handleClose(region, regionIds, 'regionIds', 'region')}>
									{region.label}
								</Tag>;
							})}
							{countryIds.map((country, index) => {
								return <Tag color="#27a9e0" className="asset-tag" closable={true} key={country.key} onClose={() => this.handleClose(country, countryIds, 'countryIds', 'country')}>
									{country.label}
								</Tag>;
							})}
							{complexityIds.map((complexity, index) => {
								return <Tag color="#27a9e0" className="asset-tag" closable={true} key={complexity.key} onClose={() => this.handleClose(complexity, complexityIds, 'complexityIds', 'complexity')}>
									{complexity.label}
								</Tag>;
							})}
							{projectManagerIds.map((projectManager, index) => {
								return <Tag color="#27a9e0" className="asset-tag" closable={true} key={projectManager.key} onClose={() => this.handleClose(projectManager, projectManagerIds, 'projectManagerIds', 'projectManager')}>
									{projectManager.label}
								</Tag>;
							})}
							<hr className="advance-filter-hr"></hr>
						</div>
					} */}
					<div className="right">
						<Row className="right" type="flex" justify="end" gutter={16}>
							<Col className="gutter-row right pr-5" span={4}>
								<Button className="reset" loading={callReset} onClick={() => this.resetFilterValues()} block><IntlMessages id="asset.button.reset" /></Button>
							</Col>
							<Col className="gutter-row right" span={4}>
								<Button className="advancedFilterOk" type="primary" loading={callFilter} onClick={() => this.applyFilter()} block><IntlMessages id="asset.button.ok" /></Button>
							</Col>
						</Row>
					</div>
				</Card>
			</PageStyle>
		)
	}
}

const actionCreators = {
	updateProjectClaimsData,
	getProjectClaimsMasterData,
	viewAllClaimGroups,
	getPMAllocationMasterData,
	getRequestType,
	getSubCategory,
	updateUserData,
	getUserList
};

const mapStateToProps = (state) => {
	return {
		global: state.global,
		user: state.user
	};
};

const WrappedDynamicRule = Form.create({ name: 'advance_filter' })(advanceFilter);

export default connect(mapStateToProps, actionCreators)(WrappedDynamicRule);
