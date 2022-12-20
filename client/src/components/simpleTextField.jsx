import React, { useState } from 'react';

const SimpleTextField = ({ label,placeholder, type, name, value, onChange, error, maxAmount }) => {
    const [touched, setTouched] = useState(false);

    const handleChange = (e) => {
        onChange({ target: { name, value: { name: e.target.value} } });
    }

    return (
        <div className="mb-4">
            <label className="form-label" htmlFor={name}>{label}</label>
            <div className="has-validation">
                <input
                    type={type}
                    id={name}
                    value={value}
                    onChange={handleChange}
                    onBlur={()=>setTouched(true)}
                    name={name}
                    className={`form-control ${error && touched && 'is-invalid'}`}
                    max={maxAmount}
                    min={0}
                    placeholder={placeholder}
                />

                {error && touched && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

export default SimpleTextField;
