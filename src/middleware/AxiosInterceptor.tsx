import { isAxiosError } from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { api } from '../lib/axios';

export function AxiosInterceptor() {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status;

          // Verificação direta de status 401
          if (status === 401) {
            localStorage.removeItem('token');

            // Verifica se o erro é por token expirado ou não autorizado
            const errorMessage = error.response?.data?.message;
            if (errorMessage === 'Token expired') {
              toast.error('Sessão expirada. Faça login novamente.');
            } else {
              toast.error('Necessário fazer o login antes.');
            }
            navigate('/sign-in', { replace: true });
          } else {
            console.error("Unhandled error:", error); // Adiciona o log detalhado de outros erros
          }
        }
        return Promise.reject(error); // Corrige o problema de promise não resolvida
      }
    );

    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, [navigate]);

  return null;
}
