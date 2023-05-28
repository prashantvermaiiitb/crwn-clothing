import Button from "../button/button.component";
import './product-card.component.styles.scss';
import { CartContext } from "../context/cart.context";
import { useContext } from "react";

/**
 * Product card for a particular product
 * @param {*} param0 
 * @returns 
 */
export const ProductCard = ({ product }) => {
    const { name, imageUrl, price } = product;
    const { addItemToCart } = useContext(CartContext);
    const addProductToCart = () => addItemToCart(product);
    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType="inverted" onClick={addProductToCart}> Add to Cart </Button>
        </div>
    );
}