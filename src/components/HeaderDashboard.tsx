import { Undo2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BpcLogo from '../assets/bpc-logo.png';


export function HeaderDashboard() {

  const navigate = useNavigate()
  function logout() {
    localStorage.removeItem('token');
    navigate('/', { replace: true })
  }

  return (
    <header className="bg-emerald-400 p-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center ml-8">
        <img src={BpcLogo} alt="Logo" className="h-16 mr-2" />
        <h1 className="text-white text-2xl">BPC sem Advogado</h1>
      </div>

      <div className="flex flex-row gap-5 items-center ">
        <Undo2 tabIndex={1} size={40} onClick={() => navigate('/dashboard')} className="text-white bg-sky-500 hover:bg-sky-300 cursor-pointer active:scale-95 rounded shadow-md px-2 py-2 focus:outline-none focus:border-2 focus:border-yellow-400" />
        <button tabIndex={2} type="button" onClick={() => logout()} className="bg-red-500 hover:bg-red-400 active:scale-95 text-white px-4 py-2 mr-6 rounded shadow-md focus:outline-none focus:border-2 focus:border-yellow-400">
          Sair
        </button>
      </div>
    </header>
  )
}