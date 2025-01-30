import { api } from "../lib/axios";

export interface StepAllProps {
  id: string
  order: number
  title: string
  description: string
  pathImage: string
}

export const stepAll = async (): Promise<any> => {
  const response = await api.get<StepAllProps>(`/step/all`);

  return response.data;
};