import React, { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext';
import Button from '../Button/Button';
import "./ProductCard.styles.scss";

const ProductCard = ({product}) => {
    const {name, price, imageUrl} = product;
    const {addItemsToCart} = useContext(CartContext);

    const addProductsToCart = () => addItemsToCart(product);


  return (
    <div className='product-card-container'>
    <img src={imageUrl} alt={name}/>
       <div className='footer'>
       <span className='name'>{name}</span>
        <span className='price'>{price}</span>
       </div>
       <Button buttonType={'inverted'} onClick={addProductsToCart}>Add to Cart</Button>
    </div>
  )
}

export default ProductCard