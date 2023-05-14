import React from 'react';

import './form-input.styles.scss'

const FormInput = ({ handleChange, label, ...otherProps }) => {
    // console.log("🚀 ~ file: form-input.component.jsx:6 ~ FormInput ~ otherProps:", otherProps)
    return (
        <div className='group'>
            <input className='form-input' autoComplete="on" onChange={handleChange} {...otherProps} />
            {
                label ?
                    (<label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>) :
                    null
            }
        </div>
    );
}

export default FormInput;