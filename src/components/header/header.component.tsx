import React from "react";
import { Outlet } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";

import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { CartIcon } from "../cart-icon/cart-icon.component";

import { useDispatch, useSelector } from "react-redux";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";
import { currentUserSelector } from "../../store/user/user.selector";
import {
  HeaderContainer,
  LogoContainer,
  Options,
  OptionsContainer,
} from "./header.styles";
// const PrintUserContext = () => {
//     const { currentUser } = useContext(UserContext);
//     console.log("🚀 ~ file: header.component.jsx:11 ~ PrintUserContext ~ currentUser:", currentUser)
//     return <h1>Reading User from Context:{!!currentUser && currentUser.email}</h1>
// }

const Header = () => {
  /**
   * selector function updates whenever the state object changes.
   * so in sign-in and sign-out in both cases this will work.
   * useSelector will directly work on the state .. what about mapstattoprops ???
   */
  const currentUser = useSelector(currentUserSelector);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();

  return (
    <>
      <HeaderContainer>
        {/*<PrintUserContext />*/}
        <LogoContainer to="/">
          <Logo className="logo" />
        </LogoContainer>
        <OptionsContainer>
          <Options to="/shop">SHOP</Options>
          <Options to="/contact">CONTACT</Options>
          {
            currentUser ? (
              <Options as="span" onClick={() => dispatch(signOutStart())}>
                SIGN OUT
              </Options>
            ) : (
              <Options to="/signin">SIGN IN</Options>
            )
            // currentUser ? <Options as='span' onClick={() => auth.signOut()}>SIGN OUT</Options> : <Options to="/signin">SIGN IN</Options>
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
};

export default Header;
