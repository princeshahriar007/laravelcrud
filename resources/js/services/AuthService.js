import Axios from "axios";
import { PUBLIC_URL } from "../constants";

/**
 * checkIfAuthenticated()
 *
 * @param {object} data
 */

export const checkIfAuthenticated = () => {
    const getLoginData = localStorage.getItem("loginData");

    if (getLoginData != null) {
        const data = JSON.parse(getLoginData);
        if (data.success && data.access_token !== null) {
            return data.user;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

/**
 * registerUser()
 *
 * @param {object} data
 */

export const registerUser = async data => {
    console.log("data", data);
    //data.user_id = 1;
    return await Axios.post(`${PUBLIC_URL}api/auth/register`, data).then(
        res => {
            //console.log("res", res);
            return res.data;
        }
    );
};

/**
 * loginUser()
 *
 * @param {object} data
 */

export const loginUser = async data => {
    console.log("data", data);
    //data.user_id = 1;
    return await Axios.post(`${PUBLIC_URL}api/auth/login`, data).then(res => {
        //console.log("res", res);
        return res.data;
    });
};
