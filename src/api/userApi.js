import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_API}/user`;

export const loginUser = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, formData);
        return { data: response.data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data?.error || "Something went wrong"
        };
    }
};

export const updateUser = async (formData) => {
    try {
        const formDataObject = new FormData();
        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                formDataObject.append(key, formData[key]);
            }
        }
        const response = await axios.patch(`${API_URL}/${formData.id}`, formDataObject);
        return { data: response.data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data?.error || "Something went wrong"
        };
    }
};

export const deleteUser = async (formData) => {
    try {
        const response = await axios.delete(`${API_URL}/${formData.id}`);
        return { data: response.data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data?.error || "Something went wrong"
        };
    }
};

export const registerUser = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, formData);
        return { data: response.data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data?.error || "Something went wrong"
        };
    }
};

export const usingGoogle = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/usingGoogle`, formData);
        return { data: response.data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data?.error || "Something went wrong"
        };
    }
};

export const fetchUserData = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error };
    }
};

fetchUserData()