import React, { useContext } from 'react';
import './shop.style.scss';
import { CategoriesContext } from '../../components/context/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';

const ShopPage = () => {

    const { categoriesMap } = useContext(CategoriesContext);
    const categoryCount = Object.keys(categoriesMap).length;
    return (
        categoryCount === 0 ? <p>loading data....</p> :
            (<div className='shop-container'>
                {
                    Object.keys(categoriesMap).map(title => {
                        const products = categoriesMap[title];
                        return (
                            <CategoryPreview key={title} title={title} products={products} />
                        )
                    })
                }
            </div>)
    );
}

export default ShopPage;