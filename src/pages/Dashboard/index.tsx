import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { StepAllProps } from "../../api/get-step-all";
import { Footer } from "../../components/Footer";
import { HeaderDashboard } from "../../components/HeaderDashboard";
import { useStepAll } from "../../hooks/useStepAll";
import { AxiosInterceptor } from "../../middleware/AxiosInterceptor";
import { Loading } from "../Loading";


interface CustomError {
  message: string
  name: string
  code: string
}


export function Dashboard() {

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
    <div className="flex flex-col h-screen w-full bg-sky-400 text-black ">
      <AxiosInterceptor />
      <HeaderDashboard />
      <div className="grid grid-cols-4 mx-10 gap-4 h-full pt-5">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {data
              .sort((a: StepAllProps, b: StepAllProps) => a.order - b.order)
              .map((step: StepAllProps) => (
                <div
                  onClick={() => navigate(`/step/${step.order}`)}
                  key={step.id}
                  tabIndex={10 + step.order}
                  className="col-span-1 flex flex-col mx-4 h-44 w-72 bg-orange-400 rounded-lg shadow-md relative overflow-hidden focus:outline-none focus:border-4 focus:border-yellow-400"
                >
                  <img src={step.pathImage} alt={`logo de ${step.title}`} className="object-cover absolute top-0" />
                  <h2 className="absolute top-0 w-full text-black text-lg font-bold bg-yellow-300/50 text-center">{step.title}</h2>
                  <p className="absolute bottom-0 bg-yellow-300 text-center">{step.description}</p>
                </div>
              ))}
          </>
        )}




      </div>
      <Footer />
    </div>
  )
}