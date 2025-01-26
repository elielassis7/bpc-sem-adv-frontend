import { useNavigate } from "react-router-dom";
import BpcLogo from '../assets/bpc-logo.png';


export function HeaderDashboard() {

  const navigate = useNavigate()
  function logout() {
    localStorage.removeItem('token');
    navigate('/', { replace: true })
  }

  return (
    <header className="bg-emerald-400 p-4 flex justify-between items-center">
      <div className="flex items-center ml-8">
        <img src={BpcLogo} alt="Logo" className="h-16 mr-2" />
        <h1 className="text-white text-2xl">BPC sem Advogado</h1>
      </div>

      <button type="button" onClick={() => logout()} className="bg-red-500 text-white px-4 py-2 mr-6 rounded">
        Sair
      </button>
    </header>
  )
}