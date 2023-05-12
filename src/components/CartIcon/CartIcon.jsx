import React, { useContext } from 'react'
import "./CartIcon.styles.jsx";
import { CartContext } from '../../contexts/CartContext';
import { CartIconContainer, ItemCount, ShoppingIcon } from './CartIcon.styles.jsx';
import { setIsCartOpen } from '../../store/cart/cart.action.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector.js';



const CartIcon = () => {
    // const {setIsCartOpen, isCartOpen, cartCount} = useContext(CartContext)
   const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);
    return (
        <CartIconContainer onClick={() => dispatch(setIsCartOpen(!isCartOpen))}>
            <ShoppingIcon className='shopping-icon' />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon