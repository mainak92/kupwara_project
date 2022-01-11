import React from 'react';
import { connect } from 'react-redux';
import { Card, Button, Icon, Form, notification, Upload, message } from 'antd';
import { uploadUsers, downloadUserTemplate } from '../../redux/actions/user';
import '../../assets/styles/card.css';
import IntlMessages from '../../utils/IntlMessages';
import { saveAs } from 'file-saver';

const duration = parseInt(process.env.REACT_APP_NOTIFICATION_DURATION);

class UploadUsers extends React.Component {
  state = {
    saveInprogress: false,
    defaultFileList: [],
    fileDoc: {},
    downloadStatus: false
  }

  extractFileName = (contentDispositionValue) => {
    var filename = "";
    if (contentDispositionValue && contentDispositionValue.indexOf('attachment') !== -1) {
      var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      var matches = filenameRegex.exec(contentDispositionValue);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, '');
      }
    }
    return filename;
  }

  downloadTemplate = () => {
    this.setState({ downloadStatus: true });
    this.props.downloadUserTemplate().then((response) => {
      this.setState({ downloadStatus: false });
      if (response.status === 200) {
        //extract file name from Content-Disposition header
        var filename = this.extractFileName(response.headers['content-disposition']);
        //invoke 'Save As' dialog
        saveAs(response.data, filename);
      } else {
        notification.error({
          message: 'Error',
          description: 'Bulk user upload template not found.',
          duration: duration
        });
      }
    });
  }

  reset = () => {
    this.props.form.resetFields();
    this.setState({
      defaultFileList: [],
      fileDoc: {}
    });
  }

  beforeUpload = (file) => {
    const fileType = file.name.split('.').pop();
    if (['xls', 'xlsx'].indexOf(fileType) === -1) {
      message.error('Invalid File Type!');
      this.reset();
    } else {
      this.setState({
        fileDoc: file,
        defaultFileList: [{
          uid: file.uid,
          name: file.name,
          status: 'done'
        }]
      });
    }
    return false;
  }

  removeFile = (e) => {
    this.setState({ fileDoc: {}, defaultFileList: [] });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.saveBulkUsers();
      }
    });
  }

  saveBulkUsers = (values) => {
    const { userId } = this.props.global;
    const { fileDoc } = this.state;
    const obj = new FormData();
    if (this.state.fileDoc) {
      obj.append('multipartFile', fileDoc);
    }

    this.setState({ saveInprogress: true });
    this.props.uploadUsers(userId, obj).then(
      (res) => {
        const status = res.data.status;
        if (status === parseInt(process.env.REACT_APP_SUCCESS_STATUS_CODE)) {
          notification.success({
            message: 'Success',
            description: res.data.message,
            duration: duration
          });
        } else if (status === parseInt(process.env.REACT_APP_PARTIAL_SUCCESS_CODE)) {
          let statusMsg = res.data.message.split('-').map((item, i) => {
            return (
              <p key={i} style={{ marginBottom: '0' }}>{item}</p>
            )
          });

          notification.warning({
            message: 'Warning',
            description: statusMsg,
            duration: duration
          });
        } else {
          notification.error({
            message: 'Error',
            description: res.data.message,
            duration: duration
          });
        }
        this.reset();
        this.setState({ saveInprogress: false });
      }
    );
  }

  render() {
    const { saveInprogress, defaultFileList, downloadStatus } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
    };

    return (
      <Card className="indegeneCard" title={<IntlMessages id="upload.users.title" />} style={{ width: '100%'}}>
        <Form style={{ marginTop: '10px' }}>
          <Form.Item {...formItemLayout} label={<IntlMessages id="user.upload.file" />}>
            {getFieldDecorator('uploadFile', {
              rules: [{
                required: true,
                message: <IntlMessages id="user.upload.warning.file" />
              }]
            })(
              <Upload
                beforeUpload={(e) => this.beforeUpload(e)}
                fileList={defaultFileList}
                onRemove={(e) => this.removeFile(e)}
                accept='.xlsx, .xls'
              >
                <Button disabled={saveInprogress}>
                  <IntlMessages id="user.click.to.upload" /> <Icon type="upload" />
                </Button>
              </Upload>
            )}
          </Form.Item>
        </Form>
        <div style={{ margin: '30px 10px 10px', textAlign: 'right' }}>
          <Button type="primary" style={{ float: 'left' }} onClick={() => this.downloadTemplate()} loading={downloadStatus}>
            <IntlMessages id="user.upload.download.user.template" /> <Icon type="download" />
          </Button>
          <Button type="primary" style={{ marginRight: '10px' }} onClick={() => this.reset()} disabled={this.state.defaultFileList.length === 0}>
            <IntlMessages id="user.upload.reset" /> <Icon type="reload" />
          </Button>
          <Button type="primary" onClick={(e) => this.handleSubmit(e)} loading={saveInprogress} disabled={this.state.defaultFileList.length === 0}>
            <IntlMessages id="user.upload.submit" /> <Icon type="right" />
          </Button>
        </div>
      </Card>
    );
  }
}

const actionCreators = {
  uploadUsers,
  downloadUserTemplate
}

const mapStateToProps = (state) => {
  return {
    global: state.global
  };
};

const WrappedDynamicRule = Form.create({ name: 'upload_users' })(UploadUsers);

export default connect(mapStateToProps, actionCreators)(WrappedDynamicRule);



