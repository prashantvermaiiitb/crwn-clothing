import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../../firebase/firebase.utils.js";

export const CategoriesContext = createContext({
    categoriesMap: {}
});

/**
 * Categories context provider
 * @param {*} param0 
 * @returns 
 */
const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});
    // console.log("🚀 ~ file: categories.context.jsx:11 ~ ProductsProvider ~ products:", products)

    // making value as JSON object will ease the destructuring in usage where product context was used.
    const value = { categoriesMap };

    /**
     * ! will be loaded once the component is loaded.
     * !This will make entry in the database.
     * 
     * !This will be commented after first execution because we do not wnat that to run 
     * !again and again.
     */
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []);

    /**
     * Fetching categories data from the firestore and making proper context.
     */
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoriesMap = await getCategoriesAndDocuments();
            // console.log("🚀 ~ file: categories.context.jsx:31 ~ getCategoriesMap ~ categoriesMap:", categoriesMap)
            setCategoriesMap(categoriesMap);
        }
        getCategoriesMap();
    }, []);

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    )
}

export default CategoriesProvider;