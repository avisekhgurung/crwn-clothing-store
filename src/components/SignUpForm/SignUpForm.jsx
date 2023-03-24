import {useContext, useState} from 'react'
import { UserContext } from '../../contexts/UserContext';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase.utils';
import Button from '../Button/Button';
import FormInput from '../FormInput/FormInput';
import './SignUpForm.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields;
    const {setCurrentUser} = useContext(UserContext);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Password does not match')
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        }
        catch (err) {
            if (err.code === 'auth/email-already-in-use') alert('Cannot create user, email already in use')
            console.error(err)
        }
    }
    return (
        <div className='sign-up-container'>
            <h2>Don't have an account ?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Display Name'
                    type="text"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}
                />

                <FormInput
                    label='Email'
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email} 
                    />

                <FormInput
                    label='Password'
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password} 
                    />

                <FormInput
                    label='Confirm Password'
                    type="password"
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword} 
                    />
                    
                <Button
                    type="submit"
                >
                    SIGN UP
                </Button>
            </form>
        </div>
    )
}

export default SignUpForm