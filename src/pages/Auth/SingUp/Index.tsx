import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Header } from '../../../components/Header';
import { fetchCity, fetchState } from '../../../lib/StateAndCity';
import { formatPhoneNumber } from '../../../util/formatPhone';

interface StepFormProps {
  step: number
  currentStep: number
  children: React.ReactNode
}

const UserSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'A confirmação da senha deve ter pelo menos 6 caracteres'),
  phone: z.string().min(14, { message: "Telefone inválido" }),
  city: z.string().min(1, { message: "Cidade é obrigatória" }),
  state: z.string().min(1, { message: "Estado é obrigatório" }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'As senhas não correspondem',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof UserSchema>;


export function SignUp() {

  const [currentStep, setCurrentStep] = useState(1)
  const { register, watch, setValue, formState: { errors, isSubmitting } } = useForm<RegisterFormData>()


  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNumber = formatPhoneNumber(event.target.value)
    setValue("phone", formattedPhoneNumber)
  }

  const [estados, setEstados] = useState<string[]>([]);
  const [cidades, setCidades] = useState<string[]>([]);


  async function fetchEstados() {
    const response = await fetchState()
    if (response === 'Error') {
      toast.error('Erro no servidor, não conseguimos buscar os Estados, tente novamente')
    }
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

  const steps = [
    { step: 1, label: 'Dados pessoais' },
    { step: 2, label: 'Pagamento' },
    { step: 3, label: 'Concluído' }
  ]

  const getColorClass = (currentStep: number, step: number) => {
    if (currentStep > step) {
      return 'bg-sky-500';
    } else if (currentStep === step) {
      return 'bg-sky-700';
    } else {
      return 'bg-gray-400';
    }
  };

  const getCursorClass = (currentStep: number, step: number) => {
    return currentStep < step ? 'cursor-not-allowed' : 'cursor-pointer'
  }

  const StepForm = ({ step, currentStep, children }: StepFormProps) => (
    <form className={`bg-white ${currentStep === step ? 'block' : 'hidden'} p-6 mt-10 rounded shadow-md w-full max-w-lg`}>
      {children}
    </form>
  )


  const increaseStep = () => setCurrentStep(currentStep + 1);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className='flex flex-col py-16 items-center'>

        <div className='w-full mx-24 flex flex-row items-center justify-evenly'>
          {steps.map(({ step, label }) => (
            <div
              key={step}
              onClick={() => currentStep >= step && setCurrentStep(step)}
              className={`relative size-10 flex items-center justify-center ${getColorClass(currentStep, step)} ${getCursorClass(currentStep, step)} text-white text-lg font-bold rounded-full`}
            >
              {step}
              <span className='absolute -translate-y-10 text-black text-center text-base'>{label}</span>
            </div>
          ))}
        </div>

        <StepForm step={1} currentStep={currentStep}>
          <h2 className="text-2xl font-bold mb-6">Dados pessoais</h2>

          <div className='flex flex-row gap-5'>

            <div className='flex flex-col'>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Nome</label>
                <input id="name" {...register("name")} className="w-full p-2 border border-gray-300 rounded mt-1" />
                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
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
            </div>

            <div className='flex flex-col'>


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
            </div>
          </div>

          <button onClick={increaseStep} type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white p-2 rounded mt-7">
            Próximo
          </button>
        </StepForm>

        <StepForm step={2} currentStep={currentStep}>
          <h2 className="text-2xl font-bold mb-6">Pagamento</h2>
          {/* Seus campos de formulário aqui */}
          <button onClick={increaseStep} type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white p-2 rounded mt-7">
            Próximo
          </button>
        </StepForm>

        <StepForm step={3} currentStep={currentStep}>
          <h2 className="text-2xl font-bold mb-6">Concluído</h2>
          <p>Parabéns seu acesso foi liberado</p>
          <p>Vamos enviar para o seu email e WhatsApp o acesso ao curso</p>
          <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white p-2 rounded mt-7">
            Finalizar
          </button>
        </StepForm>

      </div>
    </div>
  );

}


