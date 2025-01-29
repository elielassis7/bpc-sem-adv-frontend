import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { StepAllProps } from "../../api/get-step-all";
import { Footer } from "../../components/Footer";
import { HeaderDashboard } from "../../components/HeaderDashboard";
import { useStepAll } from "../../hooks/useStepAll";
import { AxiosInterceptor } from "../../middleware/AxiosInterceptor";


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
        console.error("Unknown error:", error);
      }
      navigate('/errors');
    }
  }, [error, navigate]);

  function isCustomError(error: any): error is CustomError {
    return error && typeof error.message === 'string';
  }

  return (
    <div className="flex flex-col h-screen w-full bg-sky-400 text-black">
      <AxiosInterceptor />
      <HeaderDashboard />
      <div className="flex flex-row h-full pt-3 mx-auto">
        {isLoading ? (
          <div className="flex items-center justify-center text-black font-bold text-3xl">
            Loading...

          </div>
        ) : (
          <>
            {data.map((step: StepAllProps) => (
              <div onClick={() => navigate(`/step/${step.order}`)} key={step.id} className="flex flex-col mx-4 h-36 w-72 text-black text-3xl font-bold bg-orange-400 rounded-lg shadow-md">
                <h2>{step.title}</h2>
              </div>
            ))}
          </>
        )}




      </div>
      <Footer />
    </div>
  )
}