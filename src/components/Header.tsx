import { Link } from "react-router-dom"
import BpcLogo from '../assets/bpc-logo.png'



export function Header() {



  return (
    <header className="bg-emerald-400 p-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center">
        <img src={BpcLogo} alt="Logo" className="h-16 mr-2" />
        <Link to={"/"} className="text-white text-xl font-semibold">Pagina Principal</Link>
      </div>
      <div className="flex flex-row gap-2 mr-5">
        <Link to={"/sign-up"} className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-lg font-semibold text-white px-4 py-2 rounded">
          Cadastrar
        </Link>
        <Link to={"/sign-in"} className="bg-blue-500 hover:bg-blue-400 active:scale-95 text-lg font-semibold text-white px-2 py-2 rounded">
          Login
        </Link>
      </div>

    </header>
  )
}