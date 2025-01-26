import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import './global.css'
import { routes } from './routes'

export default function App() {

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors />
      <RouterProvider router={routes} />
    </QueryClientProvider >
  )
}


