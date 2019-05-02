import React from 'react'
import '../components.css'

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function BtnDelete (props) {
  return (
    <span className='btn-delete' {...props} role='button' tabIndex='0'>
      Delete
    </span>
  )
}

export default BtnDelete
