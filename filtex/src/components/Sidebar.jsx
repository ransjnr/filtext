// eslint-disable-next-line no-unused-vars
import React from 'react'
import {BiHome, BiBookAlt, BiSolidReport, BiUser} from 'react-icons/bi';
import '../styles/sidebar.css'

const Sidebar = () => {
  return (
    <div className="menu">
    <div className="logo">
        <h2>filtex</h2>
    </div>

    <div className="menu-list">
        <a href="#" className="item active">
            <BiHome />
            Dashboard 
        </a>
        <a href="#" className="item">
            <BiBookAlt />
            History
        </a>
        <a href="#" className="item">
            <BiSolidReport />
            API Documentation
        </a>
        <a href="#" className="item">
            <BiUser />
            Join community
        </a>
    </div>
    </div>
  )
}

export default Sidebar
