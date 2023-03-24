import React from 'react'
import './FormInput.styles.jsx'
import { FormInputLabel, Group, Input } from './FormInput.styles.jsx';

const FormInput = ({ label, ...otherProps }) => {
    return (
        <Group>
            <Input
                {...otherProps}
            />
            {label &&
                <FormInputLabel shrink={otherProps.value} >{label}</FormInputLabel>
            }
        </Group>
    )
}

export default FormInput;