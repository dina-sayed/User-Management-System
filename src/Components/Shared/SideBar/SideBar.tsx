import { Bookmark, GraduationCap, House, LogOutIcon, Receipt } from 'lucide-react';
import { useContext, useState } from 'react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import './SideBar.module.css';

export default function SideBar() {
  let { loginData } = useContext(AuthContext);
  let [isCollapse, setIsCollapse] = useState(false);
  
  const toggleCollapse = () => {
    setIsCollapse(!isCollapse);
  }
  
  return (
    <>
      <div className={`sidebar-container ${isCollapse ? "collapsed" : ""}`}>
        <Sidebar collapsed={isCollapse}>
          <Menu>
            <i 
              onClick={toggleCollapse} 
              className='fas fa-bars float-end mt-2' 
              style={{ cursor: 'pointer' }}
            ></i>
            
            <h2 className='mt-3 ms-2'>UMS</h2>
            
            <div className='profile-section m-4'>
              <img 
                className='mt-3' 
                src={loginData?.image} 
                alt="profile" 
              /> 
              <h3 className='mt-3 text-center'>{loginData?.firstName}</h3>
              <h6 className='my-2 text-center text-warning'>admin</h6>
            </div>

            <MenuItem 
              className='my-1' 
              icon={<House />} 
              component={<Link to="/home" />}
            > 
              {!isCollapse && "Home"}
            </MenuItem>
            
            <MenuItem 
              className='my-1' 
              icon={<Bookmark />} 
              component={<Link to="/home/users-list" />}
            > 
              {!isCollapse && "Users"}
            </MenuItem>
            
            <MenuItem 
              className='my-1' 
              icon={<GraduationCap />} 
              component={<Link to="/home/user-data" />}
            > 
              {!isCollapse && "Add"}
            </MenuItem>
            
            <MenuItem
              className='my-1 profile-menu'
              icon={<Receipt />}
              component={
                <Link 
                  to="/home/user-data"
                  state={{ mode: "profile", id: loginData?.id }}
                />
              }
            >
              {!isCollapse && "Profile"}
            </MenuItem>
            
            <MenuItem 
              component={<Link to="/" />}
              style={{ marginTop: "100px" }}
              icon={<LogOutIcon />}
            >
              {!isCollapse && "Logout"}
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  )
}