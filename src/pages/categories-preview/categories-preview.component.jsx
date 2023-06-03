import React, { useContext } from 'react';
import { CategoriesContext } from '../../components/context/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { Fragment } from 'react/cjs/react.production.min';

const CategoriesPreview = () => {

    const { categoriesMap } = useContext(CategoriesContext);
    const categoryCount = Object.keys(categoriesMap).length;
    return (
        categoryCount === 0 ? <p>loading data....</p> :
            (<Fragment>
                {
                    Object.keys(categoriesMap).map(title => {
                        const products = categoriesMap[title];
                        return (
                            <CategoryPreview key={title} title={title} products={products} />
                        )
                    })
                }
            </Fragment>)
    );
}

export default CategoriesPreview;