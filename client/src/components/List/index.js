import React from 'react'
import '../../App.css'

export function List ({ children }) {
  return (
    <div className='list'>
      <ul className='list-ul'>{children}</ul>
    </div>
  )
}

export function ListItem ({ children }) {
  return <li className='list-li'>{children}</li>
}
