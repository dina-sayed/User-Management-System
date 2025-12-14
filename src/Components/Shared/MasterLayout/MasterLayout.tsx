import React, { useContext } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'
import { AuthContext } from '../../Context/AuthContext'

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
