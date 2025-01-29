import { useQuery } from 'react-query';
import { step, StepProp } from '../api/get-step';

export const useStep = (order: number) => {
  console.log(`useStep: ${order}`)
  return useQuery<StepProp, Error>(['step', order], () => step(order));
};
