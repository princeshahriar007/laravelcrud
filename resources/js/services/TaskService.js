import Axios from "axios";
import { PUBLIC_URL } from "../constants";

export const getTaskList = () => {};

/**
 * storeNewTask()
 *
 * @param {object} data
 */

export const storeNewTask = async data => {
    //console.log("data", data);
    data.project_id = parseInt(data.project_id);
    return await Axios.post(`${PUBLIC_URL}api/tasks`, data).then(res => {
        //console.log("res", res);
        return res.data;
    });
};

export const updateTask = async (id, data) => {
    return await Axios.put(`${PUBLIC_URL}api/tasks/${id}`, data).then(res => {
        //console.log("res", res);
        return res.data;
    });
};

export const deleteTask = async id => {
    return await Axios.delete(`${PUBLIC_URL}api/tasks/${id}`).then(res => {
        //console.log("res", res);
        return res.data;
    });
};
