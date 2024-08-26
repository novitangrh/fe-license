import api from './index';

export const login = async (loginData: { username: string; password: string }) => {
    try {
        const response = await api.post('/login', loginData);
        return response.data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
};

export const getProfile = async (token: string) => {
    try {
        const response = await api.get('/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
    }
};
