import React from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Layout, Row, Col, Breadcrumb } from 'antd';
import './index.less';
import '../assets/styles/index.css';
import AppRoutes from "../routes/appRoutes";
import Navigation from "./navigation";
import Topbar from "./topbar";
import Bottombar from "./bottombar";
import './index.css';
import IntlMessages from '../utils/IntlMessages';

const { Content } = Layout;

const PATH = process.env.REACT_APP_LINK_TO_PATH;

const pageTitleObj = {};
pageTitleObj['/FeatureEnablement'] = <IntlMessages id="menu.featurelist" />;
pageTitleObj['/Role'] = <IntlMessages id="menu.role.management" />;
pageTitleObj['/User'] = <IntlMessages id="menu.user.management" />;
pageTitleObj['/CreateUser'] = <IntlMessages id="menu.create.users" />;
pageTitleObj['/ManageUser'] = <IntlMessages id="menu.manage.user" />;
pageTitleObj['/AddRelations'] = "Add Relations";

class Template extends React.Component {
  render() {
    const word = /[/](\w+)/ig;
    const parentPath = this.props.location.pathname.match(word);
    var index = parentPath && parentPath.indexOf("/admin");
    if (index !== -1) {
      parentPath && parentPath.splice("/admin", 1);
    }
    const pathname = parentPath && parentPath[0];
    const childPathname = parentPath && parentPath[1];

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Navigation />
        <Layout>
          <Topbar />
          <Row className="rowstyle" style={{ backgroundColor: "#ffffff" }}>
            <Col span={24}>
              <div ><h2 style={{ color: '#187af7', paddingLeft: '26px', paddingTop: "9px" }}>{childPathname ? pageTitleObj[childPathname] : pageTitleObj[pathname]}</h2></div>
            </Col>
          </Row>
          {(pageTitleObj[pathname]) && <div style={{ backgroundColor: "#CCE5FF", height: "40px" }} className="breadcrumb">
            <Breadcrumb separator={pathname ? ">" : ""}>
              <Breadcrumb.Item>
                <Link to={`${PATH}`} style={{ color: "#187af7" }}>
                  Home
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item style={{ color: "#187af7" }}>{pageTitleObj[pathname]}</Breadcrumb.Item>
              {childPathname &&
                <Breadcrumb.Item><b>{pageTitleObj[childPathname]}</b></Breadcrumb.Item>
              }
            </Breadcrumb>
          </div>}
          <Content style={{ padding: 24, background: '#fff' }}>
            <AppRoutes />
          </Content>
          {/* <Bottombar /> */}
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

export default withRouter(connect(mapStateToProps)(Template));
