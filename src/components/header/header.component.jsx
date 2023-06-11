import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
// import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';

import { auth } from '../../firebase/firebase.utils';
import { CartContext } from '../context/cart.context';

import { CartIcon } from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { HeaderContainer, LogoContainer, OptionsContainer, Options } from './header.styles';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../../store/user/user.selector.js'
// const PrintUserContext = () => {
//     const { currentUser } = useContext(UserContext);
//     console.log("🚀 ~ file: header.component.jsx:11 ~ PrintUserContext ~ currentUser:", currentUser)
//     return <h1>Reading User from Context:{!!currentUser && currentUser.email}</h1>
// }

// !todo we should see how we can use context here rather than passing currentUser from the App.js
// const Header = ({ currentUser }) => {
const Header = () => {
    /**
     * selector function updates whenever the state object changes.
     * so in sign-in and sign-out in both cases this will work.
     * useSelector will directly work on the state .. what about mapstattoprops ???
     */
    const currentUser = useSelector(currentUserSelector);
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