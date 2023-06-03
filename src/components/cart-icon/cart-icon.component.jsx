import { useContext } from 'react';
// import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartContext } from '../context/cart.context';
import './cart-icon.styles.scss'
import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles'

export const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
    return (
        <CartIconContainer>
            <ShoppingIcon onClick={toggleIsCartOpen} />
            {/*<span className='item-count'>{cartItems.reduce((accumlator, cartItem) => { return accumlator + cartItem.quantity }, 0)}</span>*/}
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>

    )
}