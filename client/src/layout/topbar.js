import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Layout, Icon, Avatar, Input, Badge, Menu, Dropdown, Spin } from 'antd';
import { updateGlobalData } from "../redux/actions/global";
import IntlMessages from '../utils/IntlMessages';
import intlUni from 'react-intl-universal';
import { getUnreadNotificationCount } from '../redux/actions/notifications';

const { Header } = Layout;
const Search = Input.Search;
const locales = {
  'ar': require('../lngProvider/locales/ar_SA.json'),
  'en': require('../lngProvider/locales/en_US.json'),
  'es': require('../lngProvider/locales/es_ES.json'),
  'fr': require('../lngProvider/locales/fr_FR.json'),
  'it': require('../lngProvider/locales/it_IT.json'),
  'zh': require('../lngProvider/locales/zh-Hans.json')
};

function loadLocales(locale) {
  // init method will load CLDR locale data according to currentLocale
  // react-intl-universal is singleton, so you should init it only once in your app
  intlUni.init({
    currentLocale: locale,
    locales,
  })
}

const PATH = process.env.REACT_APP_LINK_TO_PATH;
class Topbar extends React.Component {
  state = {
    notificationCount: 0
  }

  componentDidMount() {
    loadLocales(this.props.global.locale);
    // setInterval(async () => {
    //   await this.props.getUnreadNotificationCount([], "").then((notificationCount)=>{
    //     this.setState({
    //       notificationCount
    //     })
    //   });
    // }, 5000);
  }

  toggle = () => {
    this.props.updateGlobalData({ collapsed: !this.props.global.collapsed });
  }

  logout = () => {
    this.props.global.keycloak.redirectUri = process.env.REACT_APP_REDIRECT_URI;
    this.props.global.keycloak.logout();
  }

  updateLanguage = (val) => {
    this.props.updateGlobalData({ locale: val });
    loadLocales(val);
  }

  render() {
    const { collapsed, locale } = this.props.global;
    const { unreadNotificationCount } = this.props.notifications
    const selectedLang = locale;
    const menu = (
      <Menu>
        <Menu.Item key="logout" onClick={() => this.logout()}>
          <Icon type="logout" />
          <span><IntlMessages id="topbar.logout" /></span>
        </Menu.Item>
      </Menu>
    );

    const languageMenu = (
      <Menu selectedKeys={[selectedLang]}>
        <Menu.Item key="en" onClick={() => this.updateLanguage('en')}>
          <span>English</span>
        </Menu.Item>
        <Menu.Item key="fr" onClick={() => this.updateLanguage('fr')}>
          <span>French</span>
        </Menu.Item>
      </Menu>
    );

    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <div
          style={{
            textAlign: 'right',
            height: '64px',
            lineHeight: '64px',
            padding: '0 32px',
            width: '70%',
            float: 'right'
          }}
        >
          {/* <Search
            placeholder="Search"
            onSearch={value => console.log(value)}
          />
          <Badge count={this.state.notificationCount} overflowCount={99} style={{ fontSize: '9px', marginRight: '29px', marginTop: '20px' }}>
            <Link to={`${PATH}Notification`}><Icon type="bell" style={{ fontSize: '22px', marginRight: '35px', marginTop: '22px' }} /></Link>
          </Badge> */}

          {/* <Dropdown overlay={languageMenu}>
            <Link className="ant-dropdown-link" style={{ height: '60px', display: 'inline-block', paddingRight: '12px' }} to="#">
              <Icon type="global" style={{ fontSize: "22px" }} />
            </Link>
          </Dropdown> */}

          <Dropdown overlay={menu}>
            {
              this.props.global.preferredUserName ?
                <Link className="ant-dropdown-link" style={{ height: '66px', float: 'right', marginTop: '-2px' }} to="#">
                  <span style={{ textTransform: 'capitalize' }}>{this.props.global.preferredUserName}</span> <Icon type="down" />
                </Link>
                :
                <Spin size="small" />
            }
          </Dropdown>

        </div>
      </Header>
    );
  }
}

const actionCreators = {
  updateGlobalData,
  getUnreadNotificationCount
};

const mapStateToProps = (state) => {
  return {
    global: state.global,
    notifications: state.notifications
  };
};

export default connect(mapStateToProps, actionCreators)(Topbar);
