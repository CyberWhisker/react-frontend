import axios from "axios";

export const storeProject = async (formData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/project`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const updateProject = async (formData) => {
    try {
        const response = await axios.patch(`${import.meta.env.VITE_BACKEND_API}/project/${formData.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const deleteProject = async (formData) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_API}/project/${formData.id}`)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const fetchProject = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/project`);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error };
    }
};