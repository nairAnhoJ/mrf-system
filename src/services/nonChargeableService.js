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

export const getByFleetNumber = async(fleet_number) => {
    try {
        const response = await config.get(`${baseURL}/history/${fleet_number}`, {
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
        return response;
    } catch (error) {
        return error.response;
    }
};

export const update = async(id, data) => {
    try {
        const response = await config.post(`${baseURL}/update/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const validate = async(id) => {
    try {
        const response = await config.post(`${baseURL}/validate/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const verify = async(id, data) => {
    try {
        const response = await config.post(`${baseURL}/verify/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const approve = async(id, data) => {
    try {
        const response = await config.post(`${baseURL}/approve/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const mri = async(id, data) => {
    try {
        const response = await config.post(`${baseURL}/mri/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};