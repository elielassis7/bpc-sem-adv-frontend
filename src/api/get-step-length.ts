import { api } from "../lib/axios";


export const stepLength = async (): Promise<any> => {
  const response = await api.get('/step/length');
  return response.data;
};