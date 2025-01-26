import { Link } from 'react-router-dom'
export function NotFound() {
  return (
    <div className="flex items-center justify-center bg-orange-400">
      <h1 className="text-3xl text-black font-bold">404</h1>
      <Link to={"/"}>Pagina inicial</Link>
    </div>
  )
}