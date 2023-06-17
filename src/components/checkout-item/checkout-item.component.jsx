
import { useDispatch } from 'react-redux';
import './checkout-item.styles.scss';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.reducer';

const CheckoutItem = ({ cartItem }) => {
    const { name, price, quantity, imageUrl } = cartItem;
    const dispatch = useDispatch();
    // const cartItems = useSelector(selectCartItems);
    /**
     * todo here now we are passing only the cartItem to add / remove / clear
     * reason being cartItems will be passed in reducer by redux-toolKit via createSlice method
     * So in a way we donot want useSelector(selectCartItems)
     * @returns 
     */
    const clearItemHandler = () => dispatch(clearItemFromCart(cartItem));
    const addItemHandler = () => dispatch(addItemToCart(cartItem));
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItem));
    return (
        <div className='checkout-item-container'>
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeItemHandler}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItemHandler}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={clearItemHandler}>&#10005;</div>
        </div>
    );
}

export default CheckoutItem;