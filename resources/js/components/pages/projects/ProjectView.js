import React, { Component } from "react";
import {
    Container,
    Card,
    Button,
    Badge,
    Spinner,
    InputGroup,
    Form,
    Alert
} from "react-bootstrap";
import Axios from "axios";
import { Link } from "react-router-dom";
import { PUBLIC_URL } from "../../../constants";
import TaskCreate from "../tasks/TaskCreate";
import ProjectEdit from "../projects/ProjectEdit";
import TaskList from "../tasks/TaskList";

class ProjectView extends Component {
    state = {
        project: {},
        taskList: [],
        searchTaskList: [],
        isLoading: false,

        toggleAddTask: false,
        toggleEditProject: false,

        searchText: ""
    };

    componentDidMount() {
        //Call an API and update projects to that
        //console.log(this.props.match.params.id);
        this.getProjectDetails();
    }

    getProjectDetails = () => {
        this.setState({
            isLoading: true
        });
        Axios.get(
            `${PUBLIC_URL}api/projects/${this.props.match.params.id}`
        ).then(res => {
            const taskList = res.data.data;
            //console.log("Task List", taskList);
            this.setState({
                taskList: res.data.data.tasks,
                searchTaskList: res.data.data.tasks,
                project: res.data.data,
                isLoading: false
            });
        });
    };

    ToggleAddTask = () => {
        this.setState({
            toggleEditProject: false,
            toggleAddTask: !this.state.toggleAddTask
        });
        //console.log(this.state.toggleAddTask);
    };

    ToggleEditProject = () => {
        this.setState({
            toggleAddTask: false,
            toggleEditProject: !this.state.toggleEditProject
        });
        //console.log(this.state.toggleEditProject);
    };

    onCompleteTaskCreate = task => {
        this.ToggleAddTask();
        let tasks = this.state.taskList;
        tasks.unshift(task);
        this.setState({
            taskList: tasks,
            searchTaskList: task
        });
    };

    onCompleteProjectEdit = () => {
        this.getProjectDetails();
        this.ToggleEditProject();
    };

    onEditTask = () => {
        this.getProjectDetails();
    };

    onSearchTask = e => {
        const searchText = e.target.value;
        //console.log("search text", searchText);
        this.setState({
            isLoading: true
        });
        if (searchText.length > 0) {
            const searchData = this.state.taskList.filter(function(item) {
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
                searchTaskList: searchData,
                searchText: searchText,
                isLoading: false
            });
            //console.log("searchData", searchData);
        } else {
            this.setState({
                searchText
            });
            this.getProjectDetails();
        }
    };

    render() {
        return (
            <>
                <Container>
                    <div className="header-part">
                        <div className="float-left">
                            {!this.state.toggleEditProject && (
                                <>
                                    <h1>
                                        Task List{" "}
                                        <Badge variant="primary">
                                            {this.state.searchTaskList.length}
                                        </Badge>{" "}
                                        | {this.state.project.name}
                                    </h1>
                                    <div>{this.state.project.description}</div>
                                </>
                            )}
                            {this.state.toggleEditProject && (
                                <>
                                    <ProjectEdit
                                        project={this.state.project}
                                        onCompleteProjectEdit={
                                            this.onCompleteProjectEdit
                                        }
                                    />
                                </>
                            )}
                        </div>
                        <div className="float-left text-center ml-5">
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Type to search"
                                    aria-label="Type to search"
                                    aria-describedby="basic-addon2"
                                    onChange={e => this.onSearchTask(e)}
                                />
                            </InputGroup>
                        </div>
                        <div className="float-right">
                            <button
                                className={`btn btn-outline-${
                                    this.state.project.status === 1
                                        ? "success"
                                        : "danger"
                                } mr-2`}
                                disabled
                            >
                                {this.state.project.status === 1 && (
                                    <span className="">✓ Completed</span>
                                )}
                                {this.state.project.status === 0 && (
                                    <span className="">Pending...</span>
                                )}
                            </button>
                            <Button
                                className="btn btn-success mr-2"
                                onClick={() => this.ToggleEditProject()}
                            >
                                {!this.state.toggleEditProject && (
                                    <span>Edit</span>
                                )}
                                {this.state.toggleEditProject && (
                                    <span>Cancel Editing</span>
                                )}
                            </Button>
                            <Button
                                className="btn btn-info mr-2"
                                onClick={() => this.ToggleAddTask()}
                            >
                                {!this.state.toggleAddTask && (
                                    <span>+ Add Task</span>
                                )}
                                {this.state.toggleAddTask && (
                                    <span>Cancel Adding</span>
                                )}
                            </Button>
                        </div>
                        <div className="clearfix"></div>
                    </div>

                    {this.state.toggleAddTask && (
                        <TaskCreate
                            project_id={this.props.match.params.id}
                            onCompleteProjectEdit={this.onCompleteProjectEdit}
                            onCompleteTaskCreate={this.onCompleteTaskCreate}
                        />
                    )}
                    {this.state.isLoading && (
                        <div className="text-center mt-5">
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                    )}

                    {this.state.searchTaskList.length === 0 && (
                        <Alert variant="warning">
                            No Tasks Found !! Please create one...
                        </Alert>
                    )}

                    <TaskList
                        taskList={this.state.searchTaskList}
                        isDetailsView={true}
                        onEditTask={this.onEditTask}
                    />
                </Container>
            </>
        );
    }
}

export default ProjectView;
