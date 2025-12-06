import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import  AdminRouter from './app/pages/admin/routes'
import  CleintRouter from './app/pages/client/routes'
import  homeRouter from './app/pages/home/routes'
import { ToastContainer } from 'react-toastify'


function App() {
  
const router = createBrowserRouter([
  ...homeRouter,
  ...CleintRouter
]);
  return (
    <>
     <RouterProvider router={router} />
     <ToastContainer
        position="top-right"
        autoClose={3000}   // durée en ms
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"   // "light" | "dark" | "colored"
      />
    </>
  )
}

export default App
