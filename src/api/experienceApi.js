import axios from "axios";

export const storeExperience = async (formData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/experience`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const updateExperience = async (formData) => {
    try {
        const response = await axios.patch(`${import.meta.env.VITE_BACKEND_API}/experience/${formData.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const deleteExperience = async (formData) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_API}/experience/${formData.id}`)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const fetchExperience = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/experience`);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error };
    }
};