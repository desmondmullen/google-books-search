import React from 'react';
import { NavLink } from 'react-router-dom'

function Nav () {
  return (
    <>
      <div className='navbar'><span className='nav-title'>Google Books Search</span> <div className='navbar-links'><NavLink
        to="/search"
        className='nav-link'
        activeStyle={{
          fontWeight: "bold",
          textDecoration: 'none'
        }}
      >Search</NavLink> | <NavLink
        to="/saved"
        className='nav-link'
        activeStyle={{
          fontWeight: "bold",
          textDecoration: 'none'
        }}
      >Saved</NavLink></div></div>
      {/* <div className='navbar'><span className='nav-title'>Google Books Search</span> <div className='navbar-links'><a className='nav-link' href='/search'>Search</a> | <a className='nav-link' href='/saved'>Saved</a></div></div> */}
    </ >
  );
}

export default Nav;
