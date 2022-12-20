import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ label,optionLabel, options, onChange, name, value, error }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((option) => options[option])
            : options;

    const handleChange = ({ target }) => {
        const item = optionsArray.find((option) => option._id.toString() === target.value);
        onChange({ target: { name, value: item } });
    };

    return (
        <div className="mb-3">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select
                onChange={handleChange}
                className={`form-select ${error && "is-invalid"}`}
                id={name}
                name={name}
                defaultValue={typeof value === "object" ? value._id : value}
            >
                <option disabled value="">
                    {optionLabel}
                </option>
                {optionsArray &&
                    optionsArray.map((option) => (
                        <option key={option._id} value={option._id}>
                            {option.name}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default SelectField;
