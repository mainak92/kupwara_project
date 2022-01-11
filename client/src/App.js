import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import AppLocale from "./lngProvider";
import { IntlProvider } from "react-intl";
import { LocaleProvider } from 'antd';
import Template from "./layout";
import { getUserInfo } from "./redux/actions/global";
import './assets/styles/custBootstrap.css';

const PATH = process.env.REACT_APP_ROUTE_PATH;

class App extends Component {

  componentWillMount() {
    // this.props.getUserInfo(this.props.global.emailId);
  }

  render() {
    const { locale } = this.props.global;
    const currentAppLocale = AppLocale[locale]
    return (
      <LocaleProvider locale={currentAppLocale.antd}>
        <IntlProvider locale={currentAppLocale.locale} messages={currentAppLocale.messages}>
          <Switch>
            <Route path={PATH} component={Template} />
          </Switch>
        </IntlProvider>
      </LocaleProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    global: state.global
  };
};

export default connect(mapStateToProps, { getUserInfo })(App);
