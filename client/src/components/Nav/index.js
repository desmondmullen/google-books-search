import React from 'react';

function Nav () {
  return (
    <>
      <div className='navbar'><span className='nav-title'>Google Books Search</span> <div className='navbar-links'><a className='nav-link' href='/search'>Search</a> | <a className='nav-link' href='/saved'>Saved</a></div></div>
    </ >
  );
}

export default Nav;
