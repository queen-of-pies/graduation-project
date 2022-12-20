import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TextField = ({ label,placeholder, type, name, value, onChange, error }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState(false);

    const handleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const handleChange = ({ target }) => {
        onChange({ target: { name, value: {name: target.value} } });
    };

    return (
        <div className="mb-4">
            <label className="form-label" htmlFor={name}>{label}</label>
            <div className=" has-validation">
                <input
                    type={showPassword ? 'text' : type}
                    id={name}
                    value={value}
                    onChange={handleChange}
                    onBlur={()=>setTouched(true)}
                    name={name}
                    placeholder={placeholder}
                    className={`form-control ${error && touched && 'is-invalid'}`}
                />
                {type === 'password' && !error && (
                    <i
                        className={`bi bi-eye${showPassword ? '-slash' : ''}`}
                        onClick={handleShowPassword}
                    />
                )}

                {error && touched && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

TextField.defaultProps = {
    type: 'text'
};

TextField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
};

export default TextField;
