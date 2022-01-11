import React from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import logo from '../assets/images/I-Logo.svg';
import title from '../assets/images/logo.svg';
import army from '../assets/images/army.jpg';
import './navigation.css';
import IntlMessages from '../utils/IntlMessages';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

const PATH = process.env.REACT_APP_LINK_TO_PATH;

class Navigation extends React.Component {
    render() {
        const { collapsed } = this.props.global;
        const selecetdRoutePath = this.props.location.pathname;
        const word = /[/](\w+)/ig;
        const selecetdOpenPath = selecetdRoutePath.match(word);

        return (
            <Sider trigger={null} collapsible collapsed={collapsed} width={260}>
                <div className="logo" id="logo">
                    <Link to={`${PATH}`}>
                        <img src={army} alt="logo" style={{ marginTop: '-10px' }} />
                        {/* <h1>HUMDARD-E-KUPWARA</h1> */}
                    </Link>
                </div>
                <Menu theme="light" defaultSelectedKeys={[selecetdRoutePath]} selectedKeys={[selecetdRoutePath]} defaultOpenKeys={selecetdOpenPath} mode="inline">
                    <SubMenu key={`${PATH}User`} title={<span><Icon type="user" /><span><IntlMessages id="menu.user.management" /></span></span>}>
                        <Menu.Item key={`${PATH}User/CreateUser`}>
                            <Link to={`${PATH}User/CreateUser`}><span><IntlMessages id="menu.create.users" /></span></Link>
                        </Menu.Item>
                        <Menu.Item key={`${PATH}User/ManageUser`}>
                            <Link to={`${PATH}User/ManageUser`}><span><IntlMessages id="menu.manage.user" /></span></Link>
                        </Menu.Item>
                        <Menu.Item key={`${PATH}User/AddRelations`}>
                            <Link to={`${PATH}User/AddRelations`}><span>Add Relations</span></Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        global: state.global
    };
};

export default withRouter(connect(mapStateToProps)(Navigation));
