import React from 'react';
// ! Do not need this any more now.
// import './custom-button.styles.scss';
import Button from '../button/button.component';

const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => {

    // !removing this logic for getting proper button type based on the className passd 
    // !rather having the logic for loading proper button via BUTTON_CLASSES Map
    // return (
    //     <button className={`${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps}>
    //         {children}
    //     </button>
    // );

    return (
        <Button {...otherProps}>{children}</Button>
    )
}

export default CustomButton;