import React, { useState } from 'react';
// import React, { Component, useContext, useEffect, useState } from 'react';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss';
// import { UserContext } from '../context/user.context'

import { auth, customSignInWithEmailAndPassword } from '../../firebase/firebase.utils';
import { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { useDispatch } from 'react-redux';
import { emailSignInStart, googleSignInStart } from '../../store/user/user.action';
// const defaultFormFields = {
//     email: '', password: ''
// }
const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    // const [formFields, setFormFields] = useState(defaultFormFields);
    // const { email, password } = formFields;
    // const { setCurrentUser } = useContext(UserContext);

    // const resetFormFields = () => {
    //     setFormFields(defaultFormFields);
    // }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // const { user } = await customSignInWithEmailAndPassword(auth, email, password);
            dispatch(emailSignInStart(email, password))
            // console.log("🚀 ~ file: sign-in.component.jsx:23 ~ SignIn ~ handleSubmit= ~ user:", user);
            setEmail('');
            setPassword('');
            // setFormFields(defaultFormFields);
            // setCurrentUser(user);
        } catch (error) {
            console.error(error);
        }
    }
    /**
     * Instead of triggering function for the Sign-In with google 
     * button we are going to do dispatch now, later SAGA will be 
     * taking care of launching the Google Sign-In form for us.
     */
    const handleSignInWithGoogle = async () => {
        dispatch(googleSignInStart())
    }
    return (
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="email" name="email" required type="email" value={email} handleChange={(event) => { setEmail(event.target.value) }} />
                <FormInput
                    label="password" name="password" required type="password" value={password} handleChange={(event) => setPassword(event.target.value)} />
                <div className='buttons'>
                    <CustomButton type="submit"> Sign In </CustomButton>
                    <CustomButton type="button" onClick={handleSignInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}> Sign In With Google</CustomButton>
                </div>
            </form>
        </div>
    );
}

export default SignIn;