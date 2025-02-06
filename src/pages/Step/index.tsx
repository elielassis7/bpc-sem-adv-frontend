import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Footer } from '../../components/Footer';
import { HeaderDashboard } from '../../components/HeaderDashboard';
import { useStep } from '../../hooks/useStep';
import { useStepLength } from '../../hooks/useStepLength';
import { AxiosInterceptor } from '../../middleware/AxiosInterceptor';
import { Loading } from '../Loading';
import { NotFound } from '../NotFound';
import { ListClass } from './components/ListClass';


interface CustomError {
  message: string
  name: string
  code: string
}


export function Step() {
  const { order } = useParams<{ order: string }>();
  const navigate = useNavigate()
  const { data, isLoading, error } = useStep(Number(order))
  const { data: stepLengthData, isLoading: isStepLengthLoading, error: stepLengthError } = useStepLength();


  useEffect(() => {
    if (error) {
      if (isCustomError(error)) {
        toast.error(error.message);
        console.error(error.message);
      } else {
        console.error("Unknown error:", error)
      }
      navigate('/errors');
    }

    if (stepLengthError) {
      console.error('Erro ao carregar o comprimento das etapas:', stepLengthError);
    }
  }, [error, navigate, stepLengthError]);

  function isCustomError(error: any): error is CustomError {
    return error && typeof error.message === 'string';
  }

  const maxOrder: number = stepLengthData || 0
  const orderPrevious = Number(data?.order) - 1
  const orderNext = Number(data?.order) + 1
  const currentOrder = Number(data?.order)

  const listProps = { currentOrder }



  if (isLoading || isStepLengthLoading) {
    return <Loading />;
  }

  if (error || stepLengthError) {
    return <p>Erro ao carregar dados.</p>;
  }

  if (!data || !stepLengthData) {
    return <NotFound />
  }


  return (

    <>
      <AxiosInterceptor />

      <div className='flex flex-col bg-sky-400'>
        <HeaderDashboard />

        <div className='grid grid-cols-12 gap-2'>

          <div className='col-span-1' />

          <div className='col-span-8 flex flex-col mt-4'>
            <video
              src={data?.pathVideo}
              controls
              className='w-full h-[400px] border-4 bg-black border-yellow-400 rounded-sm focus:outline-none focus:border-2 focus:border-yellow-400'
              tabIndex={10}
            />

            <h1 tabIndex={11} className='text-3xl text-gray-900 font-bold mb-4 focus:outline-none focus:border-2 focus:border-yellow-400'>{data?.title}</h1>
            <p tabIndex={12} className='text-xl text-gray-800 font-medium focus:outline-none focus:border-2 focus:border-yellow-400'>{data?.content}</p>


            <div className='flex flex-row items-center justify-center mt-10 mb-5 gap-6'>
              {orderPrevious === 0 ?
                <button
                  type='button'
                  className='flex items-center bg-gray-500 px-4 py-2 gap-1 rounded cursor-not-allowed text-white'
                >
                  <ChevronLeft />
                  Anterior
                </button> :
                <button
                  type='button'
                  tabIndex={13}
                  onClick={() => navigate(`/step/${orderPrevious}`)}
                  className='flex items-center group  px-4 py-2 gap-1 rounded cursor-pointer text-white active:scale-95 bg-green-600 hover:bg-green-500 focus:outline-none focus:border-2 focus:border-yellow-400'
                >
                  <ChevronLeft className='group-hover:-translate-x-2 duration-300' />
                  Anterior
                </button>
              }

              {orderNext > maxOrder ?
                <button
                  type='button'
                  className='flex items-center bg-gray-500 px-4 py-2 gap-1 rounded cursor-not-allowed text-white'
                >
                  Proximo
                  <ChevronRight />
                </button> :
                <button
                  type='button'
                  tabIndex={14}
                  onClick={() => navigate(`/step/${orderNext}`)}
                  className='flex items-center group px-4 py-2 gap-1 rounded cursor-pointer text-white active:scale-95 bg-green-600 hover:bg-green-500 focus:outline-none focus:border-2 focus:border-yellow-400'
                >
                  Proximo
                  <ChevronRight className='group-hover:translate-x-2 duration-300' />
                </button>
              }
            </div>

          </div>

          <div className='col-span-2 flex flex-col gap-3 mt-4'>
            <ListClass watching={listProps.currentOrder} />
          </div>

          <div className='col-span-1 ' />

        </div>

        <Footer />

      </div>

    </>
  )

}
