import { useQuery } from 'react-query';
import { stepLength } from '../api/get-step-length';

export const useStepLength = () => {
  return useQuery('stepLength', stepLength);
}
