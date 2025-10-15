import axios from "axios"
import config from "../config/config"

const token = localStorage.getItem("token");

const baseURL = `${config.defaults.baseURL}/api/parts`;

export const getAll = async() => {
    try {
        const response = await config.get(`${baseURL}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const getById = async(id) => {
    try {
        const response = await config.get(`${baseURL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const update = async(id, data) => {
    try {
        const response = await config.put(`${baseURL}/update/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};