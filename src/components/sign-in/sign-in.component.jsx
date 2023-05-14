import React, { Component, useContext, useEffect, useState } from 'react';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss';
import { UserContext } from '../context/user.context'

import { auth, signInWithGoogle, customSignInWithEmailAndPassword } from '../../firebase/firebase.utils';

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setCurrentUser } = useContext(UserContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { user } = await customSignInWithEmailAndPassword(auth, email, password);
            console.log("🚀 ~ file: sign-in.component.jsx:23 ~ SignIn ~ handleSubmit= ~ user:", user);
            setEmail('');
            setPassword('');
            setCurrentUser(user);
        } catch (error) {
            console.error(error);
        }
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
                    <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn> Sign In With Google</CustomButton>
                </div>
            </form>
        </div>
    );
}

export default SignIn;