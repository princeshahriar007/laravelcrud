import Axios from "axios";
import { PUBLIC_URL } from "../constants";

export const getProjectList = async () => {
    const loginData = JSON.parse(localStorage.getItem("loginData"));

    //data.user_id = loginData.user.id;
    return await Axios.get(`${PUBLIC_URL}api/projects/`).then(res => {
        console.log("data", res.data);
        return res.data;
    });
};

/**
 * storeNewProject()
 *
 * @param {object} data
 */

export const storeNewProject = async data => {
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    console.log("data", data);
    data.user_id = loginData.user.id;
    return await Axios.post(`${PUBLIC_URL}api/projects`, data).then(res => {
        //console.log("res", res);
        return res.data;
    });
};

export const updateProject = async (id, data) => {
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    console.log("data", data);
    data.user_id = loginData.user.id;
    return await Axios.put(`${PUBLIC_URL}api/projects/${id}`, data).then(
        res => {
            //console.log("res", res);
            return res.data;
        }
    );
};

export const deleteProject = async id => {
    console.log("id", id);
    return await Axios.delete(`${PUBLIC_URL}api/projects/${id}`).then(res => {
        //console.log("res", res);
        return res.data;
    });
};
