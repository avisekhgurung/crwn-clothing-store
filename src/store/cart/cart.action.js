import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";


export const setIsCartOpen = (boolean) =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

    
export const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems?.filter((i) => i.id !== cartItemToClear.id)
}

export const removeItemToCart = (cartItems,cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const addItemsToCart = (cartItems, productsToAdd) => {
    const newCartItems = addCartItem(cartItems, productsToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}


const addCartItem = (cartItems, productsToAdd) => {
    const existingCartItem = cartItems?.find((i) => i.id === productsToAdd.id);

    if (existingCartItem) {
        return cartItems?.map((i) => i.id === productsToAdd.id
            ?
            { ...i, quantity: i.quantity + 1 }
            :
            i
        )
    }
    return [...cartItems, { ...productsToAdd, quantity: 1 }]
}

const removeCartItem = (cartItem, cartItemToRemove) => {
    const existingCartItem = cartItem?.find((i => i.id === cartItemToRemove.id));

    if (existingCartItem.quantity === 1) {
        return cartItem?.filter((i) => i.id !== cartItemToRemove.id)
    }

    return cartItem?.map((i) => i.id === cartItemToRemove.id
        ?
        { ...i, quantity: i.quantity - 1 }
        :
        i
    )
}



