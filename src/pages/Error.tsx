import { Link } from 'react-router-dom'
export function Error() {
  return (
    <div className="flex items-center justify-center bg-cyan-400">
      <h1 className="text-3xl text-black font-bold">Error</h1>
      <Link to={"/"}>Pagina inicial</Link>
    </div>
  )
}