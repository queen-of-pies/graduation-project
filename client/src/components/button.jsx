import React from 'react';

const Button = ({ title, disabled, type, onClick }) => {
    return <button type={type?type:"submit"} disabled={disabled} className="btn btn-outline-success m-lg-2 custom-button" onClick={onClick} >{title}</button>;
};

export default Button;