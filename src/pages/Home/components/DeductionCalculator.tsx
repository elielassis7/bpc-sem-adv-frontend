import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Deduction {
  name: string;
  idName: string;
  value: number;
}

const schema = z.object({
  income: z
    .number({ required_error: 'Renda é obrigatória', invalid_type_error: 'Renda deve ser um número' })
    .positive({ message: 'Renda deve ser um número positivo' })
    .min(1, { message: 'Renda deve ser maior que zero' }),
  amount: z
    .number({ required_error: 'Quantidade é obrigatória', invalid_type_error: 'Quantidade deve ser um número' })
    .positive({ message: 'Quantidade deve ser um número positivo' })
    .min(1, { message: 'Quantidade deve ser maior que zero' }),
});

type FormData = z.infer<typeof schema>;

export function DeductionCalculator() {
  const deduction: Deduction[] = [
    {
      name: 'Medicamento',
      idName: 'medicine',
      value: 53,
    },
    {
      name: 'Consulta e tratamento medico',
      idName: 'medical',
      value: 105,
    },
    {
      name: 'Fralda',
      idName: 'diaper',
      value: 115,
    },
    {
      name: 'Alimentação especial',
      idName: 'specialFood',
      value: 141,
    },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = (data: FormData) => {
    console.log('entrou no calculo ', data);
    const { income, amount } = data;

    const checkedDeductions = deduction
      .filter(
        (item) => (document.getElementById(item.idName) as HTMLInputElement).checked
      )
      .reduce((total, item) => total + item.value, 0);

    const result = (income - checkedDeductions) / amount;
    setResult(result);
  };

  const handleClear = () => {
    reset();
    deduction.forEach((item) => {
      (document.getElementById(item.idName) as HTMLInputElement).checked = false;
    });
    setResult(null);
  };

  return (
    <div className="w-full h-auto flex items-center justify-center p-4 bg-gray-100">
      <form
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-4"
        onSubmit={handleSubmit(handleCalculate)}
      >
        <h1 className="text-2xl font-bold text-gray-700">Calculadora</h1>
        <div className="flex flex-col space-y-2">
          <label htmlFor="income" className="text-gray-600">
            Renda Familiar:
          </label>
          <input
            type="number"
            id="income"
            placeholder="Ex.: 1650"
            className="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register('income', { valueAsNumber: true })}
          />
          {errors.income && (
            <p className="text-red-500 text-sm">{errors.income.message}</p>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="amount" className="text-gray-600">
            Quantidade de Pessoas na Família:
          </label>
          <input
            type="number"
            id="amount"
            placeholder="Ex.: 4"
            className="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            {...register('amount', { valueAsNumber: true })}
          />
          {errors.amount && (
            <p className="text-red-500 text-sm">{errors.amount.message}</p>
          )}
        </div>
        <div className="space-y-2">
          {deduction.map((item) => (
            <div className="flex flex-row justify-between items-center" key={item.name}>
              <label htmlFor={item.idName} className="text-gray-600">
                {item.name}:
              </label>
              <input
                type="checkbox"
                id={item.idName}
                className="h-5 w-5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="py-2 px-4 rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={handleClear}
          >
            Limpar
          </button>
          <button
            type="submit"
            className="py-2 px-4 rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Calcular
          </button>
        </div>
      </form>
      {result !== null && (
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg mt-6 p-4 space-y-2">
          <h2 className="text-xl font-semibold text-gray-700">Resultado:</h2>
          <p className="text-gray-900 text-lg">{result.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
