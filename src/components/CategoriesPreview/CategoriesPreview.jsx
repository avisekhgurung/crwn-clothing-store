import { Fragment, useContext } from "react";
import { CategoriesContext } from "../../contexts/CategoriesContext";
import CategoryPreview from "../CategoryPreview/CategoryPreview";
import { useSelector } from "react-redux";
import { selectCategoriesIsLoading, selectCategoriesMap } from "../../store/categories/category.selector";
import Spinner from "../Spinner/Spinner";

const CategoriesPreview = () => {
    // const {categoriesMap} = useContext(CategoriesContext);
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    
  return (
    <Fragment>
      {
        isLoading ? <Spinner /> : 
        (
          Object.keys(categoriesMap)?.map((title) => (
            <CategoryPreview 
            title={title}
            products={categoriesMap[title]}
            />
           ))
        )
      }
    
    </Fragment>
   
  )
}

export default CategoriesPreview