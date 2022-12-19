import React from 'react';

const Input = ({value, type}) => {
    return <input type={type} className="custom-input" value={value}/>
};

export default Input;