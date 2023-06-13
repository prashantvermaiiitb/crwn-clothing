import React from 'react';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { Fragment } from 'react/cjs/react.production.min';
import { useSelector } from 'react-redux';
import { getCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category.selector';
import Spinner from '../../components/spinner/spinner.component';

const CategoriesPreview = () => {
    // todo extracting categories Map from the state
    const categoriesMap = useSelector(getCategoriesMap);
    // const categoryCount = Object.keys(categoriesMap).length;
    const isLoading = useSelector(selectCategoriesIsLoading)
    console.log("🚀 ~ file: categories-preview.component.jsx:13 ~ CategoriesPreview ~ isLoading:", isLoading)
    return (
        isLoading ? <Spinner /> :
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