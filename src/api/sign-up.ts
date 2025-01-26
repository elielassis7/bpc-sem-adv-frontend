import { api } from '../lib/axios';


export interface RegisterUserData {
  name: string
  email: string
  password: string
  phone: string
  city: string
  state: string
  familyIncome: number
  amountOfPeople: number
  perCapitaIncome: number
}

export const registerUser = async (userData: RegisterUserData): Promise<any> => {
  const response = await api.post('/register', userData);
  return response.data;
};