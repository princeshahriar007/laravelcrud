import React, { Component } from "react";
import { Container, Card, Button, Form, Spinner } from "react-bootstrap";
import Axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../../../constants";
import { registerUser } from "../../../services/AuthService";

class Register extends Component {
    state = {
        isLoading: false,
        Name: "",
        Email: "",
        Password: "",
        Password_confirmation: "",
        errors: {},

        validated: false
    };

    componentDidMount() {}

    changeInput = e => {
        //alert(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    submitForm = async e => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        this.setState({
            validated: true
        });

        e.preventDefault();
        const { history } = this.props;
        // console.log("history", history);
        // return false;

        const postBody = {
            Name: this.state.Name,
            Email: this.state.Email,
            Password: this.state.Password,
            Password_confirmation: this.state.Password_confirmation
        };

        if (form.checkValidity() !== false) {
            e.preventDefault();
            this.setState({
                isLoading: true
            });
            const response = await registerUser(postBody);
            console.log("response", response);
            if (response.success) {
                this.setState({
                    Name: "",
                    Email: "",
                    Password: "",
                    Password_confirmation: "",
                    isLoading: false,
                    errors: {}
                });
                localStorage.setItem("loginData", JSON.stringify(response));
                //history.push(`${PUBLIC_URL}projects`);
            } else {
                console.log("response.errors", response.error);
                this.setState({
                    errors: response.error,
                    isLoading: false
                });
                localStorage.setItem("loginData", null);
            }
        }
    };

    render() {
        return (
            <>
                <Container>
                    <div className="header-part">
                        <div className="text-center">
                            <h1>Sign Up</h1>
                        </div>
                    </div>

                    <Card>
                        <Card.Body>
                            <Form
                                noValidate
                                validated={this.state.validated}
                                onSubmit={this.submitForm}
                            >
                                <div className="row">
                                    <div className="col-6">
                                        <Form.Group controlId="Name">
                                            <Form.Label>User Name</Form.Label>
                                            <Form.Control
                                                required
                                                type="text"
                                                name="Name"
                                                placeholder="Enter Your Name"
                                                value={this.state.Name}
                                                onChange={e =>
                                                    this.changeInput(e)
                                                }
                                            />
                                            {this.state.errors &&
                                                this.state.errors.Name && (
                                                    <p className="text-danger">
                                                        {
                                                            this.state.errors
                                                                .Name[0]
                                                        }
                                                    </p>
                                                )}
                                            <Form.Control.Feedback type="invalid">
                                                Please give your name
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="col-6">
                                        <Form.Group controlId="Email">
                                            <Form.Label>
                                                Email Address
                                            </Form.Label>
                                            <Form.Control
                                                required
                                                type="email"
                                                name="Email"
                                                placeholder="Enter Email Address"
                                                value={this.state.Email}
                                                onChange={e =>
                                                    this.changeInput(e)
                                                }
                                            />
                                            {this.state.errors &&
                                                this.state.errors.Email && (
                                                    <p className="text-danger">
                                                        {
                                                            this.state.errors
                                                                .Email[0]
                                                        }
                                                    </p>
                                                )}
                                            <Form.Control.Feedback type="invalid">
                                                Please give a vaild email
                                                address
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <Form.Group controlId="Password">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                required
                                                type="password"
                                                name="Password"
                                                placeholder="Enter Password"
                                                value={this.state.Password}
                                                minLength={8}
                                                onChange={e =>
                                                    this.changeInput(e)
                                                }
                                            />
                                            {this.state.errors &&
                                                this.state.errors.Password && (
                                                    <p className="text-danger">
                                                        {
                                                            this.state.errors
                                                                .Password[0]
                                                        }
                                                    </p>
                                                )}
                                            <Form.Control.Feedback type="invalid">
                                                Please give a valid password
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                    <div className="col-6">
                                        <Form.Group controlId="Password_confirmation">
                                            <Form.Label>
                                                Confirm Password
                                            </Form.Label>
                                            <Form.Control
                                                required
                                                type="password"
                                                name="Password_confirmation"
                                                placeholder="Re-enter Password"
                                                minLength={8}
                                                value={
                                                    this.state
                                                        .Password_confirmation
                                                }
                                                onChange={e =>
                                                    this.changeInput(e)
                                                }
                                            />
                                            {this.state.errors &&
                                                this.state.errors
                                                    .Password_confirmation && (
                                                    <p className="text-danger">
                                                        {
                                                            this.state.errors
                                                                .Password_confirmation[0]
                                                        }
                                                    </p>
                                                )}
                                            <Form.Control.Feedback type="invalid">
                                                Please confirm your password
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </div>
                                </div>

                                {this.state.isLoading && (
                                    <Button
                                        variant="success"
                                        type="button"
                                        disabled
                                    >
                                        <Spinner
                                            animation="border"
                                            role="status"
                                        >
                                            <span className="sr-only">
                                                Loading...
                                            </span>
                                        </Spinner>
                                        Signing Up...
                                    </Button>
                                )}

                                {!this.state.isLoading && (
                                    <Button variant="success" type="submit">
                                        Sign Up
                                    </Button>
                                )}
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            </>
        );
    }
}

export default withRouter(Register);
