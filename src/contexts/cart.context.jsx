import { createContext,useState, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils.js';


const addCartItem = (cartItems, productToAdd) => {
  // Find if cartItems contains the productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // If found, Increment the quantity
  if(existingCartItem){
    return cartItems.map((cartItem) => cartItem.id===productToAdd.id ? 
      {...cartItem, quantity: cartItem.quantity+1}
      : cartItem
    );
  }
  // return new array with modified cartItems/ new cart item
  return [...cartItems, {...productToAdd, quantity:1}];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // Find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );
  
  // Check if the quantity is equal to 1, if it is then remove that item from the cart
  
  if(existingCartItem.quantity===1){
    return cartItems.filter(cartItem=> cartItem.id !== cartItemToRemove.id);
  };
  

  // Return the cartItems with matching cart item with reduced quantity
  return cartItems.map((cartItem) => cartItem.id===cartItemToRemove.id ? 
    {...cartItem, quantity: cartItem.quantity-1}
    : cartItem
  );
};

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_COUNT: 'SET_CART_COUNT',
  SET_CART_TOTAL: 'SET_CART_TOTAL',
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state,action) => {
  const { type, payload } = action;

  switch(type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      }
    
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      }

    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`)
  }
}; 

export const clearCartItem = (cartItems, cartItemToClear) => {       
  // Check if the item is present, if it is then remove that item from the cart
  return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});


export const CartProvider = ({children}) => {

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [{ cartCount, cartTotal, cartItems }, dispatch] = 
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total,cartItem)=> total + cartItem.quantity, 0
    );

    const newCartTotal = newCartItems.reduce(
      (total,cartItem)=> total + cartItem.quantity * cartItem.price, 0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems, 
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      }));
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (cartItemToDelete) => {
    const newCartItems = clearCartItem(cartItems,cartItemToDelete);
    updateCartItemsReducer(newCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems, 
    addItemToCart, 
    removeItemFromCart, 
    clearItemFromCart, 
    cartCount, 
    cartTotal
  };
  
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};