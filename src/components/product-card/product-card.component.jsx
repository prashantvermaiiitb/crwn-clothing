import { useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import './product-card.component.styles.scss';
import { selectCartItems } from "../../store/cart/cart.selector";


/**
 * Product card for a particular product
 * @param {*} param0 
 * @returns 
 */
export const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const { name, imageUrl, price } = product;
    const cartItems = useSelector(selectCartItems);
    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}> Add to Cart </Button>
        </div>
    );
}