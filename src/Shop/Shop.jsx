import { useEffect } from "react";
import "./shop.styles.scss"
import {Routes, Route} from 'react-router-dom'
import CategoriesPreview from '../components/CategoriesPreview/CategoriesPreview';
import Category from '../routes/Category/Category';
import { getCategoriesAndDocuments } from "../utils/firebase.utils";
import { fetchCategoriesAsync, fetchCategoriesStart } from "../store/categories/category.action";
import { useDispatch } from "react-redux";

const Shop = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
     //redux-thunk
    // dispatch(fetchCategoriesAsync());
   
    dispatch(fetchCategoriesStart());//redux-saga
},[])

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />
    </Routes>
   
  )
}

export default Shop