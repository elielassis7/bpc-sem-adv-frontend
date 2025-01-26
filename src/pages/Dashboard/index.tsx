import { Footer } from "../../components/Footer";
import { HeaderDashboard } from "../../components/HeaderDashboard";
import { AxiosInterceptor } from "../../middleware/AxiosInterceptor";



export function Dashboard() {


  return (
    <div className="flex flex-col h-screen w-full bg-sky-400 text-black">
      <AxiosInterceptor />
      <HeaderDashboard />
      <div className="flex flex-row h-full pt-3 mx-auto">

        <div className="flex flex-col mx-4 h-36 w-72 bg-orange-400 rounded-lg shadow-md">

        </div>
        <div className="flex flex-col mx-4 h-36 w-72 bg-orange-400 rounded-lg shadow-md">

        </div>
        <div className="flex flex-col mx-4 h-36 w-72 bg-orange-400 rounded-lg shadow-md">

        </div>

      </div>
      <Footer />
    </div>
  )
}