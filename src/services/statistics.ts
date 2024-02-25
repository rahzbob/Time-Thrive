import { api } from 'src/boot/axios';

export async function getDatabaseCountries() {
  try {
    const response = await api.get('/countries');
    return response.data;
  } catch (error) {
    console.error('Error fetching countries from the database:', error);
    throw error;
  }
}
