import { Link } from "react-router-dom"
import BpcLogo from '../assets/bpc-logo.png'



export function Header() {



  return (
    <header className="bg-emerald-600 px-4 h-20 w-full flex justify-between items-center shadow-lg fixed top-0 overflow-hidden">
      <div className="flex items-center">
        <Link to={"/"} tabIndex={1} className="text-white text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold">Pagina Principal</Link>
      </div>

      <div className="flex flex-row items-center">
        <img src={BpcLogo} alt="Logo" className="h-28 mr-2" />
        <h1 className="text-3xl font-bold">BPC sem Advogado</h1>
      </div>

      <div className="flex flex-row gap-2 mr-5">
        <Link to={"/sign-up"} tabIndex={2} className="bg-green-500 hover:bg-green-400 active:scale-95 text-lg font-semibold text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500">
          Adquira já
        </Link>
        <Link to={"/sign-in"} tabIndex={3} className="bg-blue-500 hover:bg-blue-400 active:scale-95 text-lg font-semibold text-white px-2 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
          Login
        </Link>
      </div>

    </header>
  )
}