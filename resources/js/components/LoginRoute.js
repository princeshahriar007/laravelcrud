import React from "react";
import { Route, Redirect } from "react-router-dom";
import { PUBLIC_URL } from "../constants";

function LoginRoute({ component: Component, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                authed === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: `${PUBLIC_URL}project`,
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}

export default LoginRoute;
