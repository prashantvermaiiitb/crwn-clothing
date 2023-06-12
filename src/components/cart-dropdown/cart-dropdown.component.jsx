import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartContainer, CartItems, EmptyMessage } from './cart-dropdown.styles';
import './cart-dropdown.styles.scss';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems } from '../../store/cart/cart.selector';

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();
    
    const goToCheckoutHandler = () => {
        navigate('/checkout')
    }
    return (
        <CartContainer>
            <CartItems>
                {cartItems.length ? cartItems.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />) : <EmptyMessage as="span">Your cart is Empty.</EmptyMessage>}
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartContainer>
    );
}

export default CartDropdown;