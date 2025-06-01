import axios from "axios";

export const storeTransaction = async (formData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/transaction`, formData)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const updateTransaction = async (formData) => {
    try {
        const response = await axios.patch(`${import.meta.env.VITE_BACKEND_API}/transaction/${formData.id}`, formData)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const deleteTransaction = async (formData) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_API}/transaction/${formData.id}`)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const fetchTransaction = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/transaction`);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error };
    }
};