import { api } from "../lib/axios";

export interface StepProp {
  id: string;
  order: number;
  name: string;
  description: string;
  pathVideo: string;
  pathImage: string;
  title: string;
  content: string;
  tips: string | null;
  sources: string | null;
}

export const step = async (order: number): Promise<StepProp> => {
  try {
    const response = await api.get<StepProp>(`/step/${order}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    throw error;
  }
};
