import React from 'react'
import '../../App.css'

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function BtnView (props) {
  console.log(props);
  return (
    <span className='btn-view btn' {...props} role='button' tabIndex='0'>
      View
    </span>
  )
}

export default BtnView
