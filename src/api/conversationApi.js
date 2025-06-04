import axios from "axios";

export const storeConversation = async (formData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/conversation`, formData)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const deleteConversation = async (id) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_API}/conversation/${id}`)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const fetchConversationByUserId = async (id) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/conversation/user/${id}`);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error };
    }
};

export const fetchConversationById = async (id) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/conversation/${id}`);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error };
    }
};