import React, { Component, useContext } from 'react';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';
import { ProductsContext } from '../../components/context/products.context';

const ShopPage = () => {

    const { products } = useContext(ProductsContext);

    return (<div className='shop-page'>
        {products.map(({ id, ...otherCollectionProps }) => <CollectionPreview key={id} {...otherCollectionProps} />)}
    </div>);

}

export default ShopPage;