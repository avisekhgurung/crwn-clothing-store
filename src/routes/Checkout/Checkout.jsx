import React, { useContext } from 'react'
import CheckoutItem from '../../components/CheckoutItem/CheckoutItem';
import { CartContext } from '../../contexts/CartContext'
import "./Checkout.styles.scss"
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';

const Checkout = () => {
  // const { cartItems, cartTotal } = useContext(CartContext);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const columns = ['Product', 'Description', 'Quantity', 'Price', 'Remove']

  return (
    <div className='checkout-container'>
      {cartItems?.length ? (
        <>
          <div className='checkout-header'>
            {columns.map((column) => (
               <div className='header-block'>
               <span>{column}</span>
             </div>
            ))}
            {/* <div className='header-block'>
              <span>Product</span>
            </div>
            <div className='header-block'>
              <span>Description</span>
            </div>
            <div className='header-block'>
              <span>Quantity</span>
            </div>
            <div className='header-block'>
              <span>Price</span>
            </div>
            <div className='header-block'>
              <span>Remove</span>
            </div> */}
          </div>
          {cartItems.map((i) =>(
              <CheckoutItem
                key={i.id}
                cartItem={i}
              />
            ))}
          <span className='total'>
            Total: {cartTotal}
          </span>
        </>
      ) : (
        <span>No Items to Checkout</span>
      )}
    </div>
  )
}

export default Checkout