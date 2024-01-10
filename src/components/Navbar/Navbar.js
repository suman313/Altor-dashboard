import React, { useEffect, useState } from 'react'
import DashLogo from "../../assets/navbar/dash-logo.svg"
import reciever from "../../assets/navbar/reciever.svg"
import settings from "../../assets/navbar/settings.svg"
import altorLogo from "../../assets/navbar/altorLogo.svg"
import "./navbar.css"
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const [user, setUser] = useState()
  const [role, setRole] = useState();
  useEffect(()=>{
    setUser(sessionStorage.getItem('email'))
    setRole(sessionStorage.getItem('role'))
  })
  const logout = () => {
    sessionStorage.clear();
    navigate('/login')
  }
  return (
    <nav>
        <div className='first-panel'>
        <div className='dash-logo' onClick={() => navigate('/')}>
            <img src={DashLogo} alt='dash-logo' />
            <p>Dashboard</p>
        </div>
        <div className='rcvr'><img src={reciever} alt='reciever' /></div>
        <div className='settings'><img src={settings} alt="settings" /></div>
        </div>
        <div className='user_info'>
            <div className='admin-info'>
            <p>{user}</p>
            <p>{role}</p>
            </div>
            <img src={altorLogo} alt="altor-logo" style={{maxWidth:'50px', padding:'5px'}}/>
        <div className='cursor-pointer text-[#5759c6] font-semibold' onClick={logout}>Log Out</div>
        </div>
    </nav>
  )
}

export default Navbar