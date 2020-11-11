import React, { Component } from "react";
import { Container, Card, Button, Form, Spinner } from "react-bootstrap";
import Axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../../../constants";
import { storeNewProject } from "../../../services/ProjectService";

class ProjectCreate extends Component {
    state = {
        isLoading: false,
        name: "",
        description: "",
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
            description: this.state.description
        };
        const response = await storeNewProject(postBody);
        if (response.success) {
            this.setState({
                name: "",
                description: "",
                isLoading: false
            });
            //alert("Project Added");
            history.push(`${PUBLIC_URL}projects`);
        } else {
            console.log("response.errors", response.error);
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
                    <div className="header-part">
                        <div className="float-left">
                            <h1>Create New Project</h1>
                        </div>
                        <div className="float-right">
                            <Link
                                className="btn btn-info"
                                to={`${PUBLIC_URL}projects`}
                            >
                                See All Projects
                            </Link>
                        </div>
                        <div className="clearfix"></div>
                    </div>

                    <Card>
                        <Card.Body>
                            <Form onSubmit={this.submitForm}>
                                <Form.Group controlId="name">
                                    <Form.Label>Project Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Enter Project Name"
                                        value={this.state.name}
                                        onChange={e => this.changeInput(e)}
                                    />
                                </Form.Group>
                                {this.state.errors &&
                                    this.state.errors.name && (
                                        <p className="text-danger">
                                            {this.state.errors.name[0]}
                                        </p>
                                    )}
                                <Form.Group controlId="description">
                                    <Form.Label>Project Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="description"
                                        as="textarea"
                                        rows="5"
                                        value={this.state.description}
                                        onChange={e => this.changeInput(e)}
                                        placeholder="Enter Project Description"
                                    />
                                </Form.Group>
                                {this.state.errors &&
                                    this.state.errors.description && (
                                        <p className="text-danger">
                                            {this.state.errors.description[0]}
                                        </p>
                                    )}

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
                                    <Button variant="primary" type="submit">
                                        Save Project
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

export default withRouter(ProjectCreate);
