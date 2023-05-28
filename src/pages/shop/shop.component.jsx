import React, { Component, useContext } from 'react';
// import CollectionPreview from '../../components/collection-preview/collection-preview.component';
import { ProductsContext } from '../../components/context/products.context';
import { ProductCard } from '../../components/product-card/product-card.component';
import './shop.style.scss';

const ShopPage = () => {

    const { products } = useContext(ProductsContext);
    // console.log("🚀 ~ file: shop.component.jsx:9 ~ ShopPage ~ products:", products)

    // return (<div className='shop-page'>
    //     {products.map(({ id, ...otherCollectionProps }) => <CollectionPreview key={id} {...otherCollectionProps} />)}
    // </div>);

    return (<div className='products-container'>
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>);

}

export default ShopPage;