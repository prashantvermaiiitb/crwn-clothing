import { createContext, useState } from "react";
import SHOP_DATA from "../../shop_data.json";

export const ProductsContext = createContext({
    products: []
});


const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(SHOP_DATA);
    // making value as JSON object will ease the destructuring in usage where product context was used.
    const value = { products };
    return (
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    )
}

export default ProductsProvider;