import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PUBLIC_URL } from "../../constants";

const Header = props => {
    const logout = () => {
        localStorage.removeItem("loginData");
        window.location.href = PUBLIC_URL + "login";
    };
    return (
        <Navbar bg="dark" expand="lg" variant="dark" sticky="top">
            <Container>
                <Link to={`${PUBLIC_URL}`}>
                    <Navbar.Brand>Task Management</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link className="text-white mr-2" to={`${PUBLIC_URL}`}>
                            Home
                        </Link>
                        <Link
                            className="text-white mr-2"
                            to={`${PUBLIC_URL}about`}
                        >
                            About
                        </Link>
                        {props.authData.isLoggedIn && (
                            <Link
                                className="text-white mr-2"
                                to={`${PUBLIC_URL}projects`}
                            >
                                Projects
                            </Link>
                        )}
                        <Link
                            className="text-white mr-2"
                            to={`${PUBLIC_URL}contact`}
                        >
                            Contact
                        </Link>
                        {!props.authData.isLoggedIn && (
                            <>
                                <Link
                                    className="text-white mr-2"
                                    to={`${PUBLIC_URL}login`}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    className="text-white mr-2"
                                    to={`${PUBLIC_URL}register`}
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </Nav>
                    <Nav className="ml-auto">
                        {props.authData.isLoggedIn && (
                            <>
                                <Nav.Link>
                                    (Welcome {props.authData.user.name})
                                </Nav.Link>
                                <Nav.Link onClick={() => logout()}>
                                    <Nav.Item className="text-white mr-2">
                                        Logout
                                    </Nav.Item>
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
