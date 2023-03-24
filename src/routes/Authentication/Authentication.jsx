import { getRedirectResult } from 'firebase/auth'
import {useEffect} from 'react'
import SignInForm from '../../components/SignInForm/SignInForm'
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import { 
  auth, 
  createUserDocumentFromAuth, 
} from '../../utils/firebase.utils'
import './Authentication.styles.scss'

const SignIn = () => {

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect( async ()=>{
    const response = await getRedirectResult(auth);
    if(response){
    await createUserDocumentFromAuth(response.user)
    }
  },[])

  return (
    <div className='authentication-container'>
      <SignInForm />
      <SignUpForm /> 
    </div>
  )
}

export default SignIn