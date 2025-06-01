import axios from 'axios';

// Upload file to the server
export const storeFile = async (file) => {
    try {
        // Create form data
        const formData = new FormData();
        formData.append('file', file);

        console.log('Uploading file:', file.name, 'Size:', file.size);

        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_API}/file/upload`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                // Add this to see upload progress if needed
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    console.log(`Upload progress: ${percentCompleted}%`);
                },
            }
        );

        console.log('Upload successful:', response.data);
        return { data: response.data, error: null };
    } catch (error) {
        console.error('Upload failed:', error);
        return {
            data: null,
            error: error.response?.data?.error || error.message || 'Upload failed',
        };
    }
};

// Get file by ID
export const getFile = async (fileId) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_API}/file/${fileId}`,
            { responseType: 'blob' }
        );
        return { data: response.data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data?.error || error.message || 'Failed to fetch file',
        };
    }
};

// Get all files (metadata only)
export const getAllFiles = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/file/`);
        return { data: response.data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response?.data?.error || error.message || 'Failed to fetch files',
        };
    }
};