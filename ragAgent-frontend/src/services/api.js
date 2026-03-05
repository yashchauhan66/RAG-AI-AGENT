import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const chatService = {
    sendMessage: async (sessionId, question) => {
        try {
            const response = await api.post('/chat', { sessionId, question });
            return response.data;
        } catch (error) {
            console.error('API Error (sendMessage):', error.response?.data || error.message);
            throw error;
        }
    },
};

export const ingestService = {
    uploadPDF: async (file) => {
        try {
            const formData = new FormData();
            formData.append('pdf', file);
            // Use the axios instance to benefit from baseURL and interceptors if any
            const response = await api.post('/ingest', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('API Error (uploadPDF):', error.response?.data || error.message);
            throw error;
        }
    },
};

export default api;
