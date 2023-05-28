import { useContext } from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartContext } from '../context/cart.context';
import './cart-icon.styles.scss'

export const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
    return (
        <div className='cart-icon-container'>
            <ShoppingIcon className="shopping-icon" onClick={toggleIsCartOpen} />
            {/*<span className='item-count'>{cartItems.reduce((accumlator, cartItem) => { return accumlator + cartItem.quantity }, 0)}</span>*/}
            <span className='item-count'>{cartCount}</span>
        </div>

    )
}