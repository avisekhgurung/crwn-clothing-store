import React, { useContext } from 'react'
import "./CartIcon.styles.jsx";
import { CartContext } from '../../contexts/CartContext';
import { CartIconContainer, ItemCount, ShoppingIcon } from './CartIcon.styles.jsx';



const CartIcon = () => {
    const {setIsCartOpen, isCartOpen, cartCount} = useContext(CartContext)
    return (
        <CartIconContainer onClick={() => setIsCartOpen(!isCartOpen)}>
            <ShoppingIcon className='shopping-icon' />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon