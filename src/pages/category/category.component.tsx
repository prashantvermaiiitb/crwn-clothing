import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ProductCard } from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";
import {
  getCategoriesMap,
  selectCategoriesIsLoading,
} from "../../store/categories/category.selector";
import "./category.styles.scss";

type CategoryRouteParams = {
  category: string;
};

const Category = () => {
  /**
   * useParams can receieve string which could be one of the keys i.e. category or anything
   * after that it will return an Object {} which can have the {keys from categoryRouteParam
   * --> type : <value from category Route Params>}
   * So we are syaing that these categories are definitely going to present.
   */
  const { category } = useParams<
    keyof CategoryRouteParams
  >() as CategoryRouteParams; // for getting category parameter from request object
  // const { categoriesMap } = useContext(CategoriesContext); // extract the categories Mao from the context
  // ! useSelector is getting hooked to the Redux store...
  // ! so everytime Store is updated then this re-render happens...
  const categoriesMap = useSelector(getCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  // To save re-rendering  of the component using useState & useEffect
  // having default value of products as undefined from categoriesMap[categories]
  // this is a safeguard from error : that can happen while rendering undefined []
  const [products, setProducts] = useState(categoriesMap[category]);

  // render component only when either categories or categoriesMap changes
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <React.Fragment>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="category-container">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default Category;
