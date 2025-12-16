import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthLayout from './Components/Shared/AuthLayout/AuthLayout'
import MasterLayout from './Components/Shared/MasterLayout/MasterLayout'
import NotFound from './Components/Shared/NotFound/NotFound'
import UserData from './Components/UserData/UserData'
import UsersList from './Components/UsersList/UsersList'
// import UserProfile from './Components/UserProfile/UserProfile'
import { ToastContainer } from 'react-toastify'
import Login from './Components/Login/Login'

function App() {

  let routes=createBrowserRouter([
    {
      path:'',
      element:<AuthLayout/>,
      errorElement:<NotFound/>,
      children:[
        {index:true,element:<Login />},
        {path:'login',element:<Login />}
      ]
    },
    {
      path:'home',
      element:<MasterLayout />,
      errorElement:<NotFound/>,
      children:[
        {index:true,element:<UsersList/>},
        {path:'users-list',element:<UsersList/>},
        {path:'user-data',element:<UserData/>},
        // {path:'user-profile',element:<UserProfile/>},
      ]
    }

  ])

  return (
        <>
          <ToastContainer />
          <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
