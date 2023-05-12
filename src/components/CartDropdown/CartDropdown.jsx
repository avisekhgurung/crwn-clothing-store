import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../contexts/CartContext'
import Button from '../Button/Button'
import CartItem from '../CartItem/CartItem'
import { CartDropdownContainer, CartItems, EmptyMessage } from './CartDropdown.styles'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector'
import { setIsCartOpen } from '../../store/cart/cart.action'



const CartDropdown = () => {
  // const { cartItems, setIsCartOpen } = useContext(CartContext);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  
  const navigateHandler = () => {
   dispatch(setIsCartOpen(false))
    navigate('/checkout')
  }

  return (
    <CartDropdownContainer>
      <CartItems>
        {
          cartItems.length ?
            cartItems?.map((item) => (
              <CartItem cartItem={item} />
            ))
            : (
              <EmptyMessage>
                Your Cart is Empty
              </EmptyMessage>
            )}
      </CartItems>
      <Button onClick={navigateHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown