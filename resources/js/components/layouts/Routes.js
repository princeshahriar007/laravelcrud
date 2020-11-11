import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ProjectList from "../pages/projects/ProjectList";
import ProjectCreate from "../pages/projects/ProjectCreate";
import { PUBLIC_URL } from "../../constants";
import ProjectView from "../pages/projects/ProjectView";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import AuthenticatedRoutes from "../AuthenticatedRoutes";

const Routes = props => {
    console.log(props.authData.isLoggedIn);
    return (
        <Switch>
            {/* Public Routes : Start */}
            <Route path={`${PUBLIC_URL}`} exact={true} component={Home} />
            <Route path={`${PUBLIC_URL}about`} exact={true} component={About} />
            <Route
                path={`${PUBLIC_URL}contact`}
                exact={true}
                component={Contact}
            />
            {/* Public Routes : End */}

            {/* Private Authenticated Routes : Start */}
            <AuthenticatedRoutes
                authed={props.authData.isLoggedIn}
                path={`${PUBLIC_URL}project/create`}
                component={ProjectCreate}
            />
            <AuthenticatedRoutes
                authed={props.authData.isLoggedIn}
                path={`${PUBLIC_URL}project/view/:id`}
                component={ProjectView}
            />
            <AuthenticatedRoutes
                authed={props.authData.isLoggedIn}
                path={`${PUBLIC_URL}projects`}
                component={ProjectList}
            />
            {/* Private Authenticated Routes : End */}
            <Route
                path={`${PUBLIC_URL}register`}
                exact={true}
                component={Register}
            />

            <Route path={`${PUBLIC_URL}login`} exact={true} component={Login} />
        </Switch>
    );
};

export default Routes;
