import api from './index';

export const getAllLicences = async () => {
    try {
        const response = await api.get('/licence');
        return response.data;
    } catch (error) {
        console.error("Error fetching licences:", error);
        throw error;
    }
};

export const createLicence = async (licenceData: {
    licence_type_id: string;
    notification_id: string;
    name: string;
    start_date: string;
    end_date: string;
    provider: string;
    amount: number;
}) => {
    try {
        const response = await api.post('/licence', licenceData);
        return response.data;
    } catch (error) {
        console.error("Error creating licence:", error);
        throw error;
    }
};

export const updateLicence = async (id: number, licenceData: {
    licence_type_id: string;
    notification_id: string;
    name: string;
    start_date: string;
    end_date: string;
    provider: string;
    amount: number;
}) => {
    try {
        const response = await api.put(`/licence/${id}`, licenceData);
        return response.data;
    } catch (error) {
        console.error("Error updating licence:", error);
        throw error;
    }
};

export const deleteLicence = async (id: number) => {
    try {
        const response = await api.delete(`/licence/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting licence:", error);
        throw error;
    }
};