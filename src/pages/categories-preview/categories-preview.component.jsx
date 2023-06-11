import React from 'react';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { Fragment } from 'react/cjs/react.production.min';
import { useSelector } from 'react-redux';
import { getCategoriesMap } from '../../store/categories/category.selector';

const CategoriesPreview = () => {
    // todo extracting categories Map from the state
    const categoriesMap = useSelector(getCategoriesMap);
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