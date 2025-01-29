import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./middleware/ProtectedRoute";
import { SignIn } from "./pages/Auth/SingIn";
import { SignUp } from "./pages/Auth/SingUp";
import { Dashboard } from "./pages/Dashboard";
import { Error } from "./pages/Error";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Step } from "./pages/Step";



export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />
  },
  {
    path: "/sign-in",
    element: <SignIn />
  },
  {
    path: "/sign-up",
    element: <SignUp />
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute element={<Dashboard />} />
  },
  {
    path: '/step/:order',
    element: <ProtectedRoute element={<Step />} />
  },
  {
    path: '*',
    element: <NotFound />
  },
  {
    path: '/errors',
    element: <Error />
  }

])