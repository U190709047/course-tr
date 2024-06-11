import React from "react";

const Input = (props) =>{
    const{label, error, name, onChange, type} = props
    const className = error ? "form-control is-invalid" : "form-control"
    return(
        <div className='form-group'>
            <input name={name}
            onChange={onChange} 
            required className={className}
            id='Username'
            type = {type}/>
            <label for ='Username' className='form-label' >{label}</label>
            <div className="invalid-feedback">
                {props.error}
            </div>
        </div>
    )
}
export default Input;