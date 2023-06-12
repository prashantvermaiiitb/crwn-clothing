// import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { cartItemCount, cartSelector } from '../../store/cart/cart.selector';
import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';
import './cart-icon.styles.scss';

/**
 * Cart Icon present on Top right corner.
 * @returns 
 */
export const CartIcon = () => {
    const dispatch = useDispatch();

    const { isCartOpen } = useSelector(cartSelector); // iscart Open boolean flag
    const cartCount = useSelector(cartItemCount); // Cart item count for selected Items

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));// dispatching toggle action

    return (
        <CartIconContainer>
            <ShoppingIcon onClick={toggleIsCartOpen} />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>

    )
}