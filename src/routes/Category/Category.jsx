import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/ProductCard/ProductCard';
import { CategoriesContext } from '../../contexts/CategoriesContext';
import "./Category.styles.scss"
import { useSelector } from 'react-redux';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector';
import Spinner from '../../components/Spinner/Spinner';

const Category = () => {
    // const { categoriesMap } = useContext(CategoriesContext);
    const categoriesMap = useSelector(selectCategoriesMap)
    const { category } = useParams();
    const [products, setProducts] = useState(categoriesMap[category])
    const isLoading = useSelector(selectCategoriesIsLoading);

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])


    return (
        <Fragment>
            <h2 className='title'>{category}</h2>
            { 
                isLoading ? <Spinner />
                    :
                    <div className='category-container'>
                        {products && products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
            }

        </Fragment>

    )
}

export default Category