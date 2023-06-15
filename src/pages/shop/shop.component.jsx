import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { fetchCategoriesStart } from '../../store/categories/category.action';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import './shop.style.scss';

const ShopPage = () => {
    const dispatch = useDispatch();
    // setting up the categories
    // !Code earlier to redux saga movement
    // useEffect(() => {
    //     const getCategoriesMap = async () => {
    //         const categoriesMap = await getCategoriesAndDocuments();
    //         // console.log("🚀 ~ file: categories.context.jsx:31 ~ getCategoriesMap ~ categoriesMap:", categoriesMap)
    //         dispatch(setCategoriesMap(categoriesMap));
    //     }
    //     getCategoriesMap();
    // }, [dispatch]);

    useEffect(() => {
        // todo this async behaviour is good candidate for moving in REDUX thunk & REDUX SAGA
        // after update this function is not at all async anymore this is regular dispatch function.
        // moved out synchronous and loading code into a thunk instead.
        console.log('***** SHOP COMPONENT IS DISPATCHING EVENT BEFORE SAGA RESPONDS ***** ')
        dispatch(fetchCategoriesStart());
    }, [dispatch]);
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    );
}

export default ShopPage;