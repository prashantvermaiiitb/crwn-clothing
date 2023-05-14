import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/crown.svg';

import { auth } from '../../firebase/firebase.utils'
import { UserContext } from '../context/user.context';

const PrintUserContext = () => {
    const { currentUser } = useContext(UserContext);
    console.log("🚀 ~ file: header.component.jsx:11 ~ PrintUserContext ~ currentUser:", currentUser)
    return <h1>Reading User from Context:{!!currentUser && currentUser.email}</h1>
}

// !todo we should see how we can use context here rather than passing currentUser from the App.js
// const Header = ({ currentUser }) => {
const Header = () => {
    const { currentUser } = useContext(UserContext)

    return (
        <>
            <div className='header'>
                <PrintUserContext />
                <Link to="/" className='logo-container'>
                    <Logo className='logo' />
                </Link>
                <div className='options'>
                    <Link className='option' to="/shop">SHOP</Link>
                    <Link className='option' to="/contact">CONTACT</Link>
                    {
                        currentUser ? <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div> : <Link className='option' to="/signin">SIGN IN</Link>
                    }
                </div>
            </div>
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