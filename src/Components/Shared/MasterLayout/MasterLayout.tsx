import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import Navbar from '../Navbar/Navbar'
import SideBar from '../SideBar/SideBar'

export default function MasterLayout() {
  let{loginData}=useContext(AuthContext);

  return (
    <>
      <div className="d-flex">
          <div className="">
            <SideBar />
          </div>
          <div className="w-100 ">
            <Navbar/>
            <Outlet/>
          </div>
      </div>
    </>
  )
}
