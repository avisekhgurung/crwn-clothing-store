import { useState, createContext, useEffect } from "react";

const addCartItem = (cartItems, productsToAdd) => {
    const existingCartItem = cartItems.find((i) => i.id === productsToAdd.id) ; 
    
    if ( existingCartItem ) {
       return  cartItems.map((i) => i.id === productsToAdd.id 
        ? 
        {...i, quantity: i.quantity + 1, price : i.price + i.price}
        : 
        i
        )
    } 
        return [...cartItems, {...productsToAdd, quantity: 1}]
}

const removeCartItem = (cartItem, cartItemToRemove) => {
    const existingCartItem = cartItem.find(( i => i.id === cartItemToRemove.id )) ; 

    if ( existingCartItem.quantity === 1 ) {
       return cartItem.filter((i) => i.id !== cartItemToRemove.id )
    }

    return  cartItem.map((i) => i.id === cartItemToRemove.id 
    ? 
    {...i, quantity: i.quantity - 1, price: i.price - i.price / i.quantity}
    : 
    i
    )
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((i) => i.id !== cartItemToClear.id)
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemsToCart: () => {},
    cartCount: 0,
    removeItemToCart: () => {},
    clearItemFromCart: () => {},
    total: 0
})

export const  CartProvider = ({children}) => {
    const[isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0)

    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove))
    }

    const addItemsToCart = (productsToAdd) => {
        setCartItems(addCartItem(cartItems, productsToAdd))
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear))
    }

    useEffect(() => {
        setCartCount(cartItems.reduce((total, item) => total + item.quantity, 0))
    },[cartItems])

    useEffect(() => {
        setCartTotal(cartItems.reduce((total, item) => total + item.price, 0))
    },[cartItems])


    const value = {isCartOpen, setIsCartOpen, cartItems, addItemsToCart, cartCount, removeItemToCart, clearItemFromCart, cartTotal}


    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
