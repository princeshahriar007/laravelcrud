import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import { PUBLIC_URL } from "../../constants";
import ProjectList from "./projects/ProjectList";

const Home = () => {
    return (
        <Container>
            <h1>Welcome to Home Page</h1>
            <p>
                Login to your account and enjoy storing and assigning your
                projects....
            </p>
            <Link to={`${PUBLIC_URL}login`} className="btn btn-primary">
                Sign In Now
            </Link>
            <p>If you don't have an account, Register from here....</p>
            <Link to={`${PUBLIC_URL}register`} className="btn btn-success">
                Sign Up
            </Link>
        </Container>
    );
};

export default Home;
