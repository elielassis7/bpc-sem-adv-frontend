import { api } from "./axios";

export const fetchState = async (): Promise<any> => {
  const response = await api.get('/state')
  return response.data

};

export const fetchCity = async (estado: string): Promise<any> => {
  const response = await api.get(`/city/${estado}`)
  return response.data
};