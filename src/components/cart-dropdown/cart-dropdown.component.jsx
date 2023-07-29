import { memo, useCallback, useMemo, useState } from 'react';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartContainer, CartItems, EmptyMessage } from './cart-dropdown.styles';
import './cart-dropdown.styles.scss';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems } from '../../store/cart/cart.selector';



const sleep = (ms, temp) => {
    let start = new Date().getTime();
    console.log("🚀 ~ file: product-card.component.jsx:9 ~ sleep ~ start:", start)
    for (var i = 0; i < 1e7; i++) {
        // if ((new Date().getTime() - start) > ms) {
        //     console.log('i m in loop');
        //     break;
        // }
    }
    console.log("🚀 ~ file: product-card.component.jsx:9 ~ sleep ~ end:", new Date().getTime());
    return temp + 1;
}

const CartDropdown = memo(() => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();
    
    const goToCheckoutHandler = useCallback(() => {
        navigate('/checkout')
    }, []);

    const [val, setVal] = useState(1);
    // const temp = sleep(1000, val);

    const temp = useMemo(() => {
        return sleep(1000, val);
    }, [val]);




    return (
        <CartContainer>
            {temp}

            <CartItems>
                {cartItems.length ? cartItems.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />) : <EmptyMessage as="span">Your cart is Empty.</EmptyMessage>}
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartContainer>
    );
});

export default CartDropdown;