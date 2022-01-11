import React, { Component } from 'react';
import { connect } from "react-redux";
import { Form, Row, Col, Input, Button, Badge, Table, Select, Popover, Tag, Card } from 'antd';
// import { withRouter } from 'react-router-dom';
import IntlMessages from '../../utils/IntlMessages';
import intlUni from 'react-intl-universal';
import PageStyle from './pageStyle';


const { Option } = Select;
const Search = Input.Search;
class Landing extends Component {
  render() {
    return (
      <PageStyle>
        <Card className="landingPageContainer">
          <div className="welcomeMessage">HUMDARD-E-KUPWARA</div>

          <div className="welcomeDesc">Your OneStop platform for searching and managing database users!</div>
        </Card>
      </PageStyle>
    );
  }
}

const actionCreators = {
};

const mapStateToProps = (state) => {
  return {
    global: state.global,
    notifications: state.notifications
  };
};

// const WrappedDynamicRule = Form.create({ name: 'notifications' })(Notification);

export default connect(mapStateToProps, actionCreators)(Landing);