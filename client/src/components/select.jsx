import React from "react";

const Select = ({title, options}) => {
    return <select className="form-select custom-select" aria-label="Default select example">
        <option selected>{title}</option>
        {options.map(option=><option key={option._id} value={option._id}>{option.name}</option>)}
    </select>
}

export default Select