import React from 'react';

function InputField({ placeholder, type, value, onChange }) {
  return (
    <input
      className='form-control custom-input-height'
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  );
}

export default InputField;
