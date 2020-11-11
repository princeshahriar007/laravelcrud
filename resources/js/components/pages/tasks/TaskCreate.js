import React, { Component } from "react";
import { Container, Card, Button, Form, Spinner } from "react-bootstrap";
import Axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { PUBLIC_URL } from "../../../constants";
import { storeNewTask } from "../../../services/TaskService";

class TaskCreate extends Component {
    state = {
        isLoading: false,
        name: "",
        description: "",
        errors: {}
    };

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
            project_id: this.props.project_id
        };
        const response = await storeNewTask(postBody);
        if (response.success) {
            console.log("response.data", response.data);
            this.setState({
                name: "",
                description: "",
                isLoading: false
            });
            this.props.onCompleteTaskCreate(response.data);
            //alert("Task Added");
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
                    <Card>
                        <Card.Body>
                            <h2>Create New Task</h2>
                            <Form onSubmit={this.submitForm}>
                                <div className="row">
                                    <div className="col-6">
                                        <Form.Group controlId="name">
                                            <Form.Label>Task Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                placeholder="Enter Task Name"
                                                value={this.state.name}
                                                onChange={e =>
                                                    this.changeInput(e)
                                                }
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-6">
                                        <Form.Group controlId="description">
                                            <Form.Label>
                                                Task Description
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="description"
                                                as="textarea"
                                                rows="3"
                                                value={this.state.description}
                                                onChange={e =>
                                                    this.changeInput(e)
                                                }
                                                placeholder="Enter Task Description"
                                            />
                                        </Form.Group>
                                    </div>
                                </div>

                                {this.state.errors &&
                                    this.state.errors.name && (
                                        <p className="text-danger">
                                            {this.state.errors.name[0]}
                                        </p>
                                    )}

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
                                        Save Task
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

export default withRouter(TaskCreate);
