import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
// import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';

import { auth } from '../../firebase/firebase.utils'
import { UserContext } from '../context/user.context';
import { CartContext } from '../context/cart.context';

import { CartIcon } from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { HeaderContainer, LogoContainer, OptionsContainer, Options } from './header.styles';

const PrintUserContext = () => {
    const { currentUser } = useContext(UserContext);
    console.log("🚀 ~ file: header.component.jsx:11 ~ PrintUserContext ~ currentUser:", currentUser)
    return <h1>Reading User from Context:{!!currentUser && currentUser.email}</h1>
}

// !todo we should see how we can use context here rather than passing currentUser from the App.js
// const Header = ({ currentUser }) => {
const Header = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    return (
        <>
            <HeaderContainer>
                {/*<PrintUserContext />*/}
                <LogoContainer to="/" >
                    <Logo className='logo' />
                </LogoContainer>
                <OptionsContainer>
                    <Options to="/shop">SHOP</Options>
                    <Options to="/contact">CONTACT</Options>
                    {
                        currentUser ? <Options as='span' onClick={() => auth.signOut()}>SIGN OUT</Options> : <Options to="/signin">SIGN IN</Options>
                    }
                    <CartIcon />
                </OptionsContainer>
                {isCartOpen && <CartDropdown />}
            </HeaderContainer>
            {/** 
                    This outlet will be rendering the child components passed in the Header component
                    This is similar to this.props.children that we used to do earlier.
                    Header is termaned as the parental component.
                    While the Outlet is termed as the child component.
            */}
            <Outlet />
        </>
    );
}

export default Header;