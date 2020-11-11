import React, { Component } from "react";
import { Container, Card, Button, Form, Spinner } from "react-bootstrap";
import Axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../../../constants";
import { updateProject } from "../../../services/ProjectService";

class ProjectEdit extends Component {
    state = {
        isLoading: false,
        id: this.props.project.id,
        name: this.props.project.name,
        description: this.props.project.description,
        status: this.props.project.status,
        errors: {}
    };

    componentDidMount() {}

    changeInput = e => {
        //alert(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    submitForm = async e => {
        e.preventDefault();
        const { history } = this.props;
        // console.log("history", history);
        // return false;
        this.setState({
            isLoading: true
        });
        const postBody = {
            name: this.state.name,
            description: this.state.description,
            status: this.state.status
        };
        const response = await updateProject(this.state.id, postBody);
        if (response.success) {
            this.setState({
                name: "",
                description: "",
                isLoading: false
            });
            //alert("Project Added");
            console.log("Response", response);
            this.props.onCompleteProjectEdit();
        } else {
            this.setState({
                errors: response.error,
                isLoading: false
            });
        }
    };

    render() {
        return (
            <>
                <Container>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={this.submitForm}>
                                <div className="row">
                                    <div className="col-6">
                                        <Form.Group controlId="name">
                                            <Form.Label>
                                                Project Name
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                placeholder="Enter Project Name"
                                                value={this.state.name}
                                                onChange={e =>
                                                    this.changeInput(e)
                                                }
                                            />
                                        </Form.Group>
                                        {this.state.errors &&
                                            this.state.errors.name && (
                                                <p className="text-danger">
                                                    {this.state.errors.name[0]}
                                                </p>
                                            )}
                                    </div>
                                    <div className="col-6">
                                        <Form.Group controlId="description">
                                            <Form.Label>
                                                Project Descrition
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="description"
                                                as="textarea"
                                                rows="1"
                                                value={this.state.description}
                                                onChange={e =>
                                                    this.changeInput(e)
                                                }
                                                placeholder="Enter Project Description"
                                            />
                                        </Form.Group>
                                        {this.state.errors &&
                                            this.state.errors.description && (
                                                <p className="text-danger">
                                                    {
                                                        this.state.errors
                                                            .description[0]
                                                    }
                                                </p>
                                            )}
                                    </div>
                                    <div className="col-6 mb-3">
                                        <Form.Label>Project Status</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={this.state.status}
                                            name="status"
                                            onChange={e => this.changeInput(e)}
                                        >
                                            <option
                                                value={0}
                                                className="text-danger"
                                            >
                                                Pending
                                            </option>
                                            <option
                                                value={1}
                                                className="text-success"
                                            >
                                                Completed
                                            </option>
                                        </Form.Control>
                                        {this.state.errors &&
                                            this.state.errors.name && (
                                                <p className="text-danger">
                                                    {
                                                        this.state.errors
                                                            .status[0]
                                                    }
                                                </p>
                                            )}
                                    </div>
                                </div>

                                {this.state.isLoading && (
                                    <Button
                                        variant="primary"
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
                                        Saving...
                                    </Button>
                                )}

                                {!this.state.isLoading && (
                                    <Button variant="success" type="submit">
                                        Update Project
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

export default withRouter(ProjectEdit);
