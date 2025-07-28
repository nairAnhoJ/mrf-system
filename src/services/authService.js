import axios from "axios"
import config from "../config/config"

const token = localStorage.getItem("token");

const baseURL = `${config.defaults.baseURL}/api/auth`;

export const UserLogin = async(data) => {
    try {
        const response = await axios.post(`${baseURL}/login`, data);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        console.log(response.data.user);
        

        return response.data;
    } catch (error) {
        return error;
    }
};

export const Me = async() => {
    try {
        const response = await axios.get(`${baseURL}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(response);
        
        return response.data;
    } catch (error) {
        if(error.status === 403){
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        
        return error;
    }
}

export const IsValid = async() => {
    try {
        const response = await axios.get(`${baseURL}/is-valid`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if(error.status === 403){
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        
        return error;
    }
}

export const getRole = async() => {
    try {
        const response = await axios.get(`${baseURL}/get-role`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if(error.status === 403){
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        
        return error;
    }
}

export const ChangePassword = async(id, data) => {
    try {
        const response = await axios.post(`${baseURL}/change-password/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        return error;
    }
};