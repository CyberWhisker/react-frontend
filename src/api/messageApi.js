import axios from "axios";

export const storeMessage = async (formData) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_API}/message`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const updateMessage = async (formData) => {
    try {
        const response = await axios.patch(`${import.meta.env.VITE_BACKEND_API}/message/${formData.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const deleteMessage = async (formData) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_API}/message/${formData.id}`)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error }
    }
}

export const fetchMessageByConvoId = async (id) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/message/convoId/${id}`);
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error };
    }
};

export const fetchMessagesUnread = async (id) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/message/unread/${id}`)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error };
    }
}

export const markMessageReadBy = async (id, convoId) => {
    try {
        const response = await axios.patch(`${import.meta.env.VITE_BACKEND_API}/message/markMessagesAsReadByConversation/${id}/${convoId}`)
        return { data: response.data, error: null };
    } catch (error) {
        return { data: [], error: error };
    }
}