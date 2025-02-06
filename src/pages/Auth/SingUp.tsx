import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import * as z from 'zod';
import { registerUser } from '../../api/sign-up';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { fetchCity, fetchState } from '../../lib/StateAndCity';
import { formatPhoneNumber } from '../../util/formatPhone';


const UserSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'A confirmação da senha deve ter pelo menos 6 caracteres'),
  phone: z.string().min(14, { message: "Telefone inválido" }),
  city: z.string().min(1, { message: "Cidade é obrigatória" }),
  state: z.string().min(1, { message: "Estado é obrigatório" }),
  familyIncome: z.number().min(1, { message: "Renda familiar é obrigatória" }),
  amountOfPeople: z.number().min(1, { message: "Quantidade de pessoas é obrigatória" }),
  perCapitaIncome: z.number(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'As senhas não correspondem',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof UserSchema>;

export function SignUp() {
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
    resolver: zodResolver(UserSchema),
  })
  const navigate = useNavigate();


  const rendaFamiliar = watch("familyIncome") || 0;
  const quantidadePessoas = watch("amountOfPeople") || 1;
  const rendaPerCapita = rendaFamiliar / quantidadePessoas;

  useEffect(() => {
    setValue("perCapitaIncome", rendaPerCapita);
  }, [rendaFamiliar, quantidadePessoas, rendaPerCapita, setValue])

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNumber = formatPhoneNumber(event.target.value)
    setValue("phone", formattedPhoneNumber)
  }

  const [estados, setEstados] = useState<string[]>([]);
  const [cidades, setCidades] = useState<string[]>([]);


  async function fetchEstados() {
    const response = await fetchState()
    setEstados(response.sort())
  }

  async function fetchCidades(estado: string) {
    const response = await fetchCity(estado)
    setCidades(response.sort())
  };

  useEffect(() => {
    fetchEstados()
  }, []);

  useEffect(() => {
    const selectedEstado = watch("state");
    if (selectedEstado) {
      fetchCidades(selectedEstado);
      setValue("city", ""); // Restaurar cidade quando estado mudar
    }
  }, [watch("state")]);

  const mutation = useMutation(registerUser, {
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      toast.success('Cadastro realizado com sucesso!');
      navigate('/dashboard');
    },
    onError: (error) => {
      toast.error('Erro no cadastro. Por favor, tente novamente.');
      console.error('Erro no cadastro:', error);
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(data);
  };


  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className='flex flex-col items-center justify-center'>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 mt-10 rounded shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-6">Cadastro</h2>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Nome</label>
            <input id="name" {...register("name")} className="w-full p-2 border border-gray-300 rounded mt-1" />
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              autoComplete='username'
              {...register("email")}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Senha</label>
            <input
              id="password"
              type="password"
              {...register("password")}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              autoComplete='new-password'
            />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700">Confirme a senha</label>
            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              autoComplete='new-password'
            />
            {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">Telefone</label>
            <input
              id="phone"
              {...register("phone")}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              onChange={handlePhoneNumberChange}
              maxLength={16} // to handle input length
            />
            {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="state" className="block text-gray-700">Estado</label>
            <select id="state" {...register("state")} className="w-full p-2 border border-gray-300 rounded mt-1">
              <option value="">Selecione um estado</option>
              {estados.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            {errors.state && <span className="text-red-500">{errors.state.message}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-700">Cidade</label>
            <select id="city" {...register("city")} className="w-full p-2 border border-gray-300 rounded mt-1">
              <option value="">Selecione uma cidade</option>
              {cidades.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {errors.city && <span className="text-red-500">{errors.city.message}</span>}
          </div>

          <div className="mb-4 relative">
            <label htmlFor="familyIncome" className="block text-gray-700">Renda Familiar</label>
            <span className="absolute left-3 top-10 text-gray-900">R$</span>
            <input
              id="familyIncome"
              type="number"
              {...register("familyIncome", { valueAsNumber: true })}
              className="w-full pl-10 p-2 border border-gray-300 rounded mt-1"

            />
            {errors.familyIncome && <span className="text-red-500">{errors.familyIncome.message}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="amountOfPeople" className="block text-gray-700">Quantidade de Pessoas</label>
            <input id="amountOfPeople" type="number" {...register("amountOfPeople", { valueAsNumber: true })} className="w-full p-2 border border-gray-300 rounded mt-1" />
            {errors.amountOfPeople && <span className="text-red-500">{errors.amountOfPeople.message}</span>}
          </div>

          <div className="mb-4 ">
            <label>Renda Per Capita: R$</label>
            <input
              type="number"
              readOnly
              {...register("perCapitaIncome", { valueAsNumber: true })}
              value={rendaPerCapita.toFixed(2)}
              className='outline-none'
            />
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white p-2 rounded">Cadastrar</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}


