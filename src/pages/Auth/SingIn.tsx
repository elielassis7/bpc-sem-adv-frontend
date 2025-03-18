import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { loginUser } from '../../api/sign-in';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';


// Esquema de validação com Zod
const loginSchema = z.object({
  email: z.string().email("O email deve ser válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

// Tipagem para os dados do formulário
type LoginFormInputs = z.infer<typeof loginSchema>;


export function SignIn() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation(loginUser, {
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    },
    onError: (error) => {
      toast.error('Erro no login. Por favor, tente novamente.');
      console.error('Erro no login:', error);
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    mutation.mutate(data);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header />
      <div className='flex flex-col items-center justify-center my-auto'>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              autoComplete='email'
              {...register('email')}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Senha</label>
            <input
              type="password"
              id="password"
              autoComplete='current-password'
              {...register('password')}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Entrar
          </button>
          <Link className='text-sky-600 hover:text-sky-800 font-semibold py-2 flex justify-center' to={"/sign-up"}>Cadastro</Link>
        </form>
      </div>
      <Footer />
    </div>
  );
}
