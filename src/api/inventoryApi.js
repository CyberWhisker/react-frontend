import axios from "axios";

export const storeInventory = async (formData) => {
    const formDataObject = new FormData();
    for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
            formDataObject.append(key, formData[key]);
        }
    }
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/inventory`, formDataObject)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const updateInventory = async (formData) => {
    const formDataObject = new FormData();
    for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
            formDataObject.append(key, formData[key]);
        }
    }
    try {
        const response = await axios.patch(`${import.meta.env.VITE_BACKEND_API}/inventory/${formData.id}`, formDataObject)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const deleteInventory = async (formData) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_API}/inventory/${formData.id}`)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const fetchInventory = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/inventory`);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error };
    }
};