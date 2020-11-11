import React, { Component } from "react";
import {
    Container,
    Card,
    Button,
    Badge,
    Spinner,
    Form,
    InputGroup,
    Alert
} from "react-bootstrap";
import Axios from "axios";
import { Link } from "react-router-dom";
import { PUBLIC_URL } from "../../../constants";
import TaskList from "../tasks/TaskList";
import { deleteProject } from "../../../services/ProjectService";
import { getProjectList } from "../../../services/ProjectService";

class ProjectList extends Component {
    state = {
        projectList: [],
        searchProjectList: [],
        searchText: "",
        isLoading: false
    };

    componentDidMount() {
        //Call an API and update projects to that
        console.log("props", this.props);

        this.getProjectList();
    }

    getProjectList = async () => {
        this.setState({
            isLoading: true
        });
        const response = await getProjectList();
        if (response.success) {
            this.setState({
                projectList: response.data,
                searchProjectList: response.data,
                isLoading: false
            });
            console.log("ProjectList", this.state.searchProjectList);
        } else {
            this.setState({
                isLoading: false
            });
        }
    };

    deleteProject = async id => {
        const response = await deleteProject(id);
        if (response.success) {
            this.getProjectList();
        } else {
            alert("Sorry !! Something went wrong !!");
        }
    };

    onSearchProject = e => {
        const searchText = e.target.value;
        //console.log("search text", searchText);
        this.setState({
            isLoading: true
        });
        if (searchText.length > 0) {
            const searchData = this.state.projectList.filter(function(item) {
                const itemData = item.name + " " + item.description;
                const textData = searchText.trim().toLowerCase();
                return (
                    itemData
                        .trim()
                        .toLowerCase()
                        .indexOf(textData) !== -1
                );
            });
            this.setState({
                searchProjectList: searchData,
                searchText: searchText,
                isLoading: false
            });
            //console.log("searchData", searchData);
        } else {
            this.setState({
                searchText
            });
            this.getProjectList();
        }
    };

    render() {
        return (
            <>
                <Container>
                    <div className="header-part">
                        <div className="float-left">
                            <h1>
                                Project List{" "}
                                <Badge variant="primary">
                                    {this.state.searchProjectList.length}
                                </Badge>
                            </h1>
                        </div>
                        <div className="float-left text-center ml-5">
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Type to search"
                                    aria-label="Type to search"
                                    aria-describedby="basic-addon2"
                                    onChange={e => this.onSearchProject(e)}
                                />
                            </InputGroup>
                        </div>
                        <div className="float-right">
                            <Link
                                className="btn btn-info"
                                to={`${PUBLIC_URL}project/create`}
                            >
                                + Create Project
                            </Link>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    {this.state.isLoading && (
                        <div className="text-center mt-5">
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                    )}

                    {this.state.searchProjectList.length === 0 && (
                        <Alert variant="warning">
                            No projects Found !! Please create one...
                        </Alert>
                    )}

                    {this.state.searchProjectList.map((project, index) => (
                        <Card key={index} className="mt-3">
                            <Card.Header>
                                {project.name}{" "}
                                <Badge variant="primary">
                                    Tasks {project.tasks_count}
                                </Badge>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>{project.description}</Card.Text>
                                <Link
                                    to={`${PUBLIC_URL}project/view/${project.id}`}
                                    className="btn btn-success mr-2"
                                >
                                    View & Edit
                                </Link>
                                <Button
                                    variant="danger"
                                    className="mr-2"
                                    onClick={() =>
                                        this.deleteProject(project.id)
                                    }
                                >
                                    Delete
                                </Button>
                            </Card.Body>
                            {/* <Card.Footer>
                                <TaskList
                                    taskList={project.tasks}
                                    isDetailsView={false}
                                />
                            </Card.Footer> */}
                        </Card>
                    ))}
                </Container>
            </>
        );
    }
}

export default ProjectList;
