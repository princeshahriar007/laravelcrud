import React, { Component } from "react";
import { Container, Card, Button, Badge, Spinner } from "react-bootstrap";
import { updateTask } from "../../../services/TaskService";
import { deleteTask } from "../../../services/TaskService";

class TaskList extends Component {
    toggleCompleteStatus = async item => {
        if (item.status === 0) {
            item.status = 1;
        } else {
            item.status = 0;
        }
        await updateTask(item.id, item);
        this.props.onEditTask();
    };

    deleteTask = async id => {
        const response = await deleteTask(id);
        if (response.success) {
            this.props.onEditTask();
        } else {
            alert("Sorry !! Something went wrong !!");
        }
    };

    render() {
        return (
            <>
                {this.props.taskList.map((task, index) => (
                    <Card key={index} className="mt-3 mb-3">
                        <Card.Header>
                            <div>
                                <div className="float-left">
                                    {task.status == 1 && (
                                        <del className="text-success">
                                            <strong>
                                                {task.name}{" "}
                                                <Badge variant="primary">
                                                    {task.tasks_count}
                                                </Badge>
                                            </strong>
                                        </del>
                                    )}
                                    {task.status == 0 && (
                                        <span>
                                            {task.name}{" "}
                                            <Badge variant="primary">
                                                {task.tasks_count}
                                            </Badge>
                                        </span>
                                    )}
                                </div>
                                <div className="float-right">
                                    <button
                                        className={`btn btn-outline-${
                                            task.status === 1
                                                ? "danger"
                                                : "success"
                                        } btn-sm`}
                                        onClick={() =>
                                            this.toggleCompleteStatus(task)
                                        }
                                    >
                                        {task.status === 0 && (
                                            <span> ✓ Mark as Completed </span>
                                        )}
                                        {task.status === 1 && (
                                            <span> Mark as Pending </span>
                                        )}
                                    </button>
                                    <button
                                        className="btn btn-outline-danger btn-sm ml-2"
                                        onClick={() => this.deleteTask(task.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            {this.props.isDetailsView && (
                                <Card.Text>{task.description}</Card.Text>
                            )}
                        </Card.Body>
                    </Card>
                ))}
            </>
        );
    }
}

export default TaskList;
