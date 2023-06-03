import { useParams } from 'react-router-dom';
import './category.styles.scss'
import { useContext, useEffect, useState } from 'react';
import { CategoriesContext } from '../../components/context/categories.context';
import { ProductCard } from '../../components/product-card/product-card.component';
import { Fragment } from 'react/cjs/react.production.min';

const Category = () => {

    const { category } = useParams();// for getting category parameter from request object 
    const { categoriesMap } = useContext(CategoriesContext); // extract the categories Mao from the context 

    // To save re-rendering  of the component using useState & useEffect
    // having default value of products as undefined from categoriesMap[categories] 
    // this is a safeguard from error : that can happen while rendering undefined [] 
    const [products, setProducts] = useState(categoriesMap[category]);

    // render component only when either categories or categoriesMap changes
    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment><h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>

                {
                    products && products.map(product => <ProductCard key={product.id} product={product} />)
                }
            </div>
        </Fragment>
    );
}

export default Category;