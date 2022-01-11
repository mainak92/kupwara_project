import styled from 'styled-components';

const UserManagementStyle = styled.div`

	.ant-card-head {
	    background-color: #187af7;
	    color: #ffff;
	}

	.ant-card-head-title {
	    color: white;
	}

	.ant-card-bordered {
	    border: 1px solid #187af7;
	    border-radius: 4px;
	}

	#circle {
	    background: lightgrey;
	    width: 102px;
	    height: 102px;
	    border-radius: 50%;
	    position: relative;
	}

	.alignRight {
	    text-align: right;
	}

	.ant-table-thead>tr>th {
	    color: #2cb9ca;
	}

	.span1 {
	    float: left;
	}

	.ant-card-body {
	    padding: 0px;
	}

	.ant-table-thead>tr>th {
	    background: transparent;
	    border: transparent;
	}

	.ant-card-wider-padding .ant-card-body {
	    padding: 0px;
	}

	.ant-table-thead>tr>th .ant-table-column-sorter {
	    color: black;
	}

	.dropbox {
	    height: 180px;
	    line-height: 1.5;
	}

	.avatar-uploader>.ant-upload {
	    width: 170px;
	    height: 170px;
	}

	.ant-modal-footer {
	    display: none;
	}

	.footer-buttons .ant-form-explain-holder {
	    display: none;
	}

	.ant-input-group-addon {
		background-color: #ffffff
	}
	
	span.avatar-uploader.ant-upload-picture-card-wrapper{
    zoom: 1;
    display: flex;
    width: 180px;
}
`;

export default UserManagementStyle;