import { Fragment, useContext } from "react";
import { CategoriesContext } from "../../contexts/CategoriesContext";
import CategoryPreview from "../CategoryPreview/CategoryPreview";

const CategoriesPreview = () => {
    const {categoriesMap} = useContext(CategoriesContext);
    
  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => (
       <CategoryPreview 
       title={title}
       products={categoriesMap[title]}
       />
      ))}
    
    </Fragment>
   
  )
}

export default CategoriesPreview