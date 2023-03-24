import React, { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext';
import { signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from '../../utils/firebase.utils';
import Button from '../Button/Button';
import FormInput from '../FormInput/FormInput';
import './SignInForm.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = React.useState(defaultFormFields)
    const { email, password } = formFields;
    const {setCurrentUser} = useContext(UserContext);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
       await signInWithGooglePopup();
        // setCurrentUser(user);

      }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(response.user);
            resetFormFields();
        }
        catch (err) {
            // eslint-disable-next-line default-case
            switch(err.code){
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email')
                    break;
                default:
                    console.error(err)
            }
        }
    }
    return (
        <div className='sign-in-container'>
            <h2>Already have an account ?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

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

                <div className='buttons-container'>
                <Button
                    type="submit"
                >
                    SIGN IN
                </Button>
                     
                <Button
                    type='button'
                    onClick={signInWithGoogle}
                    buttonType={'google'}
                >
                   GOOGLE SIGN IN  
                </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm