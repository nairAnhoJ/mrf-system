import axios from "axios"
import config from "../config/config"

const token = localStorage.getItem("token");

const baseURL = `${config.defaults.baseURL}/api/mrf/nonchargeable/requests`;

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

export const getByRequestId = async(id) => {
    try {
        const response = await config.get(`${baseURL}/parts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const create = async(data) => {
    try {
        const response = await config.post(`${baseURL}/create`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.request;
    } catch (error) {
        return error.response;
    }
};