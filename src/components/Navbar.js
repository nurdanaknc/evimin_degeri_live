import React from 'react';
import './Navbar.css'
import logo from './logo.svg';

function Navbar() {
  return (
    <nav>
        <img src={logo} alt="logo" className='logo'/>
    </nav>
  );
}

export default Navbar;