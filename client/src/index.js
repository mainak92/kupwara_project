import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Keycloak from 'keycloak-js';
import axios from "axios";
import store from "./utils/store";
import { updateUserInfo } from "./redux/actions/global";
import { Switch, Router } from 'react-router-dom';
import history from "./utils/history";
import { Provider } from "react-redux";

if (module.hot) {
    module.hot.accept();
}

const kc = Keycloak(`${process.env.REACT_APP_LINK_TO_PATH}keycloak.json`);

const render = () => {
    ReactDOM.render(
        // Wrap Provider inside AppContainer
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <App />
                </Switch>
            </Router>
        </Provider>,
        document.getElementById('app')
    );
};

kc.init({ onLoad: "check-sso", checkLoginIframe: false }).success(authenticated => {
    if (authenticated) {
        if (kc.realmAccess.roles.indexOf('ROLE_ADMIN') !== -1) {
            store.dispatch(updateUserInfo(kc.tokenParsed, kc));    
            render();
        } else {
            kc.logout();
        }
    } else {
        kc.login();
    }
});

axios.interceptors.request.use(config => {
    config.headers = Object.assign({}, config.headers, {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + kc.token
    });
    return config;
});

axios.interceptors.response.use((response) => {
    // Do something with response data
    return response;
}, (error) => {
    // Do something with response error
    if (error.response.status === 401) {
        kc.redirectUri = process.env.REACT_APP_REDIRECT_URI;
        kc.logout();
    }
    return error;
});