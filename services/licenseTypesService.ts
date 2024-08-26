import api from './index';

export const getAllLicenseTypes = async () => {
  try {
    const response = await api.get('/licence-type');
    return response.data;
  } catch (error) {
    console.error("Error fetching licence types:", error);
    throw error;
  }
};

export const createLicenseType = async (name: string) => {
    try {
      const response = await api.post('/licence-type', { name });
      return response.data;
    } catch (error) {
      console.error("Error creating licence type:", error);
      throw error;
    }
  };

export const updateLicenseType = async (id: number, name: string) => {
    try {
        const response = await api.put(`/licence-type/${id}`, { name });
        return response.data;
    } catch (error) {
        console.error("Error updating licence type:", error);
        throw error;
    }
};

export const deleteLicenseType = async (id: number) => {
    try {
        const response = await api.delete(`/licence-type/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting licence type:", error);
        throw error;
    }
};