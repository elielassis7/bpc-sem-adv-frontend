import { House } from 'lucide-react'
import { Link } from 'react-router-dom'
export function Error() {
  return (
    <div className="flex flex-col gap-3 h-screen items-center justify-center bg-cyan-400">
      <h1 className="text-4xl text-black font-bold">Error</h1>
      <Link to={"/"} className='flex font-semibold underline text-black hover:text-emerald-800'>
        <House />
        Pagina inicial
      </Link>
      <p className='mt-4 text-base text-gray-800'>Será necessário fazer o login novamente!</p>
    </div>
  )
}