import React from 'react';

function Nav() {
  return (
    <>
      <span className='nav-title'>Google Books</span> <a className='nav-link' href='/search'>Search</a> <a className='nav-link' href='/saved'>Saved</a>
    </ >
  );
}

export default Nav;
