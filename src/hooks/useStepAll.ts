import { useQuery } from 'react-query';
import { stepAll } from '../api/get-step-all';

export const useStepAll = () => {
  return useQuery('stepAll', stepAll);
}
