// InputField.js
import React from 'react'

function InputField({ placeholder, type }) {
  return (
    <><input type={type} placeholder={placeholder} required/></>
  )
}

export default InputField
