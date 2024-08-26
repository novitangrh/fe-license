import api from './index';

export const getAllNotifications = async () => {
    try {
        const response = await api.get('/notification-setting');
        return response.data;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error;
    }
};

export const updateNotificationById = async (id: number, updateData: {
    duration_type: string;
    notification_days: number[];
}) => {
    try {
        const response = await api.put(`/notification-setting/${id}`, updateData);
        return response.data;
    } catch (error) {
        console.error(`Error updating notification with ID ${id}:`, error);
        throw error;
    }
};
