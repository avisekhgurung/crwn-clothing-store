import React from 'react'
import Button from '../Button/Button';
import "./ProductCard.styles.scss";
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemsToCart } from '../../store/cart/cart.action';

const ProductCard = ({product}) => {
    const {name, price, imageUrl} = product;
    // const {addItemsToCart} = useContext(CartContext);
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems);
    
  return (
    <div className='product-card-container'>
    <img src={imageUrl} alt={name}/>
       <div className='footer'>
       <span className='name'>{name}</span>
        <span className='price'>{price}</span>
       </div>
       <Button buttonType={'inverted'} onClick={() => dispatch(addItemsToCart(cartItems, product))}>Add to Cart</Button>
    </div>
  )
}

export default ProductCard