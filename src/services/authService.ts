import axios from "axios"
import config from "../config/config"

const token = localStorage.getItem("token");

const baseURL = `${config.defaults.baseURL}/api/auth`;

interface Data {
    id_number: string;
    password: string;
}

export const UserLogin = async(data: Data) => {
    try {
        const response = await axios.post(`${baseURL}/login`, data);
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
        return response.data;
    } catch (error: any) {
        if(error.status === 403){
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        
        return error;
    }
}

export const ChangePassword = async(id: number, data: { password: string; password_confirmation: string }) => {
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