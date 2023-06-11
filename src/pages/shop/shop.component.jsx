import { Route, Routes } from 'react-router-dom';
import './shop.style.scss';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { useEffect } from 'react';
import { getCategoriesAndDocuments } from '../../firebase/firebase.utils';
import { setCategoriesMap } from '../../store/categories/category.action';
import { useDispatch } from 'react-redux';

const ShopPage = () => {
    const dispatch = useDispatch();
    // setting up the categories
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesMap = await getCategoriesAndDocuments();
            // console.log("🚀 ~ file: categories.context.jsx:31 ~ getCategoriesMap ~ categoriesMap:", categoriesMap)
            dispatch(setCategoriesMap(categoriesMap));
        }
        getCategoriesMap();
    }, [dispatch]);
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    );
}

export default ShopPage;