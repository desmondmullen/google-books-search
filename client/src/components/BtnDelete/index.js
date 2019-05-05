import React from 'react'
import '../../App.css'

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function BtnDelete (props) {
  return (
    <span className='btn-delete btn' {...props} role='button' tabIndex='0'>
      Remove from Saved
    </span>
  )
}

export default BtnDelete
