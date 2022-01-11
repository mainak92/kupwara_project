import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
    UserManagement, CreateUser, AddRelations, LandingPage
} from './routes';

const PATH = process.env.REACT_APP_LINK_TO_PATH;

const AppRoutes = () => {
    return (
        <Switch>
            <Route exact path={`${PATH}`} component={LandingPage} />
            <Route exact path={`${PATH}User/ManageUser`} component={UserManagement} />
            <Route exact path={`${PATH}User/CreateUser`} component={CreateUser} />
            <Route exact path={`${PATH}User/AddRelations`} component={AddRelations} />
        </Switch>
    );
};

export default AppRoutes;