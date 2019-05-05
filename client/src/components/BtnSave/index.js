import React from 'react'
import '../components.css'

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function BtnSave (props) {
  return (
    <span className='btn-save' {...props} role='button' tabIndex='0'>
      Add to Saved
    </span>
  )
}

export default BtnSave
