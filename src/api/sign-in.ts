import { api } from '../lib/axios';


interface LoginUserData {
  email: string;
  password: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginUser = async (userData: LoginUserData): Promise<any> => {
  const response = await api.post('/login', userData);
  return response.data;
};