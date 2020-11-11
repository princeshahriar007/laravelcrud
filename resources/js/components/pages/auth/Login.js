import React, { Component } from "react";
import { Container, Card, Button, Form, Spinner, Alert } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../../../constants";
import { loginUser } from "../../../services/AuthService";

class Login extends Component {
    state = {
        isLoading: false,
        Email: "",
        Password: "",
        errors: {},
        errorMessage: "",
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
            Email: this.state.Email,
            Password: this.state.Password
        };

        if (form.checkValidity() !== false) {
            e.preventDefault();
            this.setState({
                isLoading: true
            });
            const response = await loginUser(postBody);
            console.log("response", response);
            if (response.success) {
                this.setState({
                    Email: "",
                    Password: "",
                    isLoading: false,
                    errors: {}
                });
                localStorage.setItem("loginData", JSON.stringify(response));
                //history.replace(`${PUBLIC_URL}projects`);
                window.location.href = PUBLIC_URL + "projects";
            } else {
                console.log("response.errors", response.error);
                this.setState({
                    errors: response.error,
                    isLoading: false,
                    errorMessage: response.message
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
                            <h1>Sign In</h1>
                        </div>
                        <div className="clearfix"></div>
                    </div>

                    <Form
                        noValidate
                        validated={this.state.validated}
                        onSubmit={this.submitForm}
                    >
                        <div className="row justify-content-center">
                            <div className="col-8">
                                <Card>
                                    <Card.Body>
                                        {this.state.errorMessage.length > 0 && (
                                            <Alert
                                                variant="danger"
                                                onClose={() =>
                                                    this.setState({
                                                        errorMessage: ""
                                                    })
                                                }
                                                dismissible
                                            >
                                                {this.state.errorMessage}
                                            </Alert>
                                        )}
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
                                        {this.state.isLoading && (
                                            <Button
                                                variant="success"
                                                type="button"
                                                disabled
                                                block
                                            >
                                                <Spinner
                                                    animation="border"
                                                    role="status"
                                                >
                                                    <span className="sr-only">
                                                        Loading...
                                                    </span>
                                                </Spinner>
                                                Signing In...
                                            </Button>
                                        )}
                                        {!this.state.isLoading && (
                                            <Button
                                                variant="success"
                                                type="submit"
                                                block
                                            >
                                                Sign In
                                            </Button>
                                        )}
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </Form>
                </Container>
            </>
        );
    }
}

export default withRouter(Login);
