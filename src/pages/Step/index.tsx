import { useNavigate, useParams } from 'react-router-dom';
import { useStep } from '../../hooks/useStep'; // Certifique-se do caminho correto

export function Step() {
  const { order } = useParams<{ order: string }>();
  const navigate = useNavigate()
  const { data, isLoading, error } = useStep(Number(order));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const orderPrevious = Number(data?.order) - 1
  const orderNext = Number(data?.order) + 1

  return (
    <div className='flex flex-col items-center justify-evenly'>
      <h1>{data?.title}</h1>
      <p>{data?.content}</p>

      <div className='flex flex-row items-center justify-center gap-6'>
        <button type='button' onClick={() => navigate(`/step/${orderPrevious}`)}>Anterior</button>
        <button type='button' onClick={() => navigate(`/step/${orderNext}`)}>Proximo</button>
      </div>
    </div>
  );
}
