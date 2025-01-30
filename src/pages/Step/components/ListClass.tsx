import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { StepAllProps } from "../../../api/get-step-all";
import { useStepAll } from "../../../hooks/useStepAll";


interface CustomError {
  message: string
  name: string
  code: string
}


export function ListClass({ watching }: { watching: number }) {


  const navigate = useNavigate()

  const { data, isLoading, error } = useStepAll();

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
  }, [error, navigate]);

  function isCustomError(error: any): error is CustomError {
    return error && typeof error.message === 'string';
  }


  return (
    <>


      {isLoading ? (
        <>
          <div className='w-full h-32 bg-purple-500 flex items-center justify-center gap-1 mt-2'>
            <h1 className="text-black text-2xl font-bold text-center">Loading...</h1>
            <LoaderCircle className="animate-spin" />
          </div>
          <div className='w-full h-32 bg-purple-500 flex items-center justify-center gap-1 mt-2'>
            <h1 className="text-black text-2xl font-bold text-center">Loading...</h1>
            <LoaderCircle className="animate-spin" />
          </div>
          <div className='w-full h-32 bg-purple-500 flex items-center justify-center gap-1 mt-2'>
            <h1 className="text-black text-2xl font-bold text-center">Loading...</h1>
            <LoaderCircle className="animate-spin" />
          </div>
        </>
      ) : (
        <>
          {data
            .sort((a: StepAllProps, b: StepAllProps) => a.order - b.order)
            .map((step: StepAllProps) => (

              <div
                onClick={() => navigate(`/step/${step.order}`)}
                key={step.id}
                tabIndex={20 + step.order}
                className="flex flex-col h-[110px] w-full cursor-pointer bg-orange-400 rounded-lg shadow-md relative overflow-hidden focus:outline-none focus:border-2 focus:border-yellow-400"
              >

                <img src={step.pathImage} alt="Logo do cadastro Único" className="object-cover absolute top-0" />
                <h2 className="absolute bottom-0 w-full text-black text-sm font-bold bg-yellow-500/30 text-center object-cover">{step.title}</h2>
                {watching === step.order ?
                  <div className="absolute w-full h-full bg-gray-700/50 flex items-center justify-center">
                    <h2 className=" text-white text-lg font-semibold text-center">Assistindo</h2>
                  </div>
                  : ""
                }
              </div>
            ))}
        </>
      )}
    </>
  )
}