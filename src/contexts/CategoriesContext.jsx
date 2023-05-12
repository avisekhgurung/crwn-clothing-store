import React, { useEffect } from "react"
import { getCategoriesAndDocuments } from "../utils/firebase.utils";
// import SHOP_DATA from '../shopData.js'
// import { addCollectionAndDocuments } from "../utils/firebase.utils.js";

export const CategoriesContext = React.createContext({
   categoriesMap: {},
})

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = React.useState({});
    const value = {categoriesMap}

    // useEffect(() =>{
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // },[])

    useEffect(()=>{
        const getCategories =  async () => {
           const categoryMap = await  getCategoriesAndDocuments();
           setCategoriesMap(categoryMap)
        }
        getCategories()
},[])

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    )
}