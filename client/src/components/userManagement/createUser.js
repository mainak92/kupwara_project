import React from 'react';
import { connect } from 'react-redux';
import { Card, Button, Upload, Modal, Icon } from 'antd';
import UserForm from './userForm';
import '../../assets/styles/card.css';
import IntlMessages from '../../utils/IntlMessages';
import PageStyle from './pageStyle';

const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

class CreateUser extends React.Component {
  state = {
    loading: false,
    visible: false
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  getUploadButton = () => {
    return <Button onClick={this.showModal}>
      UPLOAD
    </Button>
  }
  render() {
    return (
      <React.Fragment>
        <Card className="indegeneCard" title={<IntlMessages id="create.user.title" />} style={{ width: '100%' }}>
          <UserForm />
        </Card>
        <Modal
          title="UPLOAD BULK USERS"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
              UPLOAD
            </Button>
          ]}
        >
          <PageStyle>
            <div className="downloadContainer">
              <Button>
                <Icon type="download" /> Download User Template
              </Button>
            </div>
            <div className="uploadContainer">
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> Select File to Upload
                </Button>
              </Upload>
            </div>
          </PageStyle>
        </Modal>
      </React.Fragment>
    );
  }
}

const actionCreators = {
}

const mapStateToProps = (state) => {
  return {
    global: state.global,
    user: state.user,
    role: state.role
  };
};

export default connect(mapStateToProps, actionCreators)(CreateUser);



