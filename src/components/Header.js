import React from 'react';
import '../styles/Header.css';
import logo from '../assets/logo.png'

function Header() {


  return (
      <div class="logo-container" style={{ backgroundImage: `url(${logo})`}}>
      <a href='/'>
        <h1 class="logo">
        HAWConnect        
  </h1>
  </a>
</div>

  );
}

export default Header;
