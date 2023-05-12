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

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_COUNT: 'SET_CART_COUNT',
    SET_CART_TOTAL: 'SET_CART_TOTAL',
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const cartReducer = (state, action) => {
    const {type, payload} = action;
    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            }
        default:
            throw new Error(`Unhandled Type ${type} in cartReducer`)
    }
}

const AddToCartAction = (itemToAdd) => dispatchEvent({type:'ADD_TO_CART', payload:itemToAdd})

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
