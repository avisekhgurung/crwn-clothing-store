import { useState, createContext, useEffect, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productsToAdd) => {
    const existingCartItem = cartItems.find((i) => i.id === productsToAdd.id) ; 
    
    if ( existingCartItem ) {
       return  cartItems.map((i) => i.id === productsToAdd.id 
        ? 
        {...i, quantity: i.quantity + 1}
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
    {...i, quantity: i.quantity - 1}
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
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
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
    // const[isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount, setCartCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0)
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const {cartItems, isCartOpen, cartCount, cartTotal} = state;


    // useEffect(() => {
    //     setCartCount(cartItems.reduce((total, item) => total + item.quantity, 0))
    // },[cartItems])

    // useEffect(() => {
    //     setCartTotal(cartItems.reduce((total, item) => total + item.price, 0))
    // },[cartItems])

  
   


    const updateCartItemReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, item) => total  + item.quantity, 0)

        const newCartTotal = newCartItems.reduce((total, item ) => total + item.price * item.quantity, 0)

        // dispatch({
        //     type:CART_ACTION_TYPES.SET_CART_ITEMS, 
        //     payload: {
        //         cartItems: newCartItems, 
        //         cartTotal: newCartTotal, 
        //         cartCount:newCartCount 
        //     }
        // })
        dispatch(
            createAction(
                CART_ACTION_TYPES.SET_CART_ITEMS,
                {
                    cartItems: newCartItems,
                    cartCount: newCartCount,
                    cartTotal: newCartTotal
                }
            )
        )


    }

    const removeItemToCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemReducer(newCartItems);
     }
 
     const addItemsToCart = (productsToAdd) => {
         const newCartItems = addCartItem(cartItems, productsToAdd);
         updateCartItemReducer(newCartItems);
     }
 
     const clearItemFromCart = (cartItemToClear) => {
         const newCartItems = clearCartItem(cartItems, cartItemToClear);
         updateCartItemReducer(newCartItems);
     }

     const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
     }
 

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemsToCart, cartCount, removeItemToCart, clearItemFromCart, cartTotal}


    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
