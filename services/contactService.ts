import api from './index';

export const getAllContacts = async () => {
    try {
        const response = await api.get('/contact');
        return response.data;
    } catch (error) {
        console.error("Error fetching contacts:", error);
        throw error;
    }
};

export const createContact = async (contactData: { name: string; whatsapp_number: string }) => {
    try {
        const response = await api.post('/contact', contactData);
        return response.data;
    } catch (error) {
        console.error("Error creating contact:", error);
        throw error;
    }
};

export const updateContact = async (id: number, contactData: { name: string; whatsapp_number: string }) => {
    try {
        const response = await api.put(`/contact/${id}`, contactData);
        return response.data;
    } catch (error) {
        console.error("Error updating contact:", error);
        throw error;
    }
};

export const deleteContact = async (id: number) => {
    try {
        const response = await api.delete(`/contact/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting contact:", error);
        throw error;
    }
};
