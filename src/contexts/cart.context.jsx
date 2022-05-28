import { createContext, useEffect, useState } from 'react';


export const addCartItem = (cartItems, productToAdd) => {
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

export const removeCartItem = (cartItems, cartItemToRemove) => {
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

export const clearCartItem = (cartItems, cartItemToClear) => {       
  // Check if the item is present, if it is then remove that item from the cart
  return cartItems.filter(cartItem=> cartItem.id !== cartItemToClear.id);
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: ()=>{},
  clearItemFromCart: ()=>{},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({children}) => {

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);


  useEffect(()=>{
    const newCartCount = cartItems.reduce(
      (total,cartItem)=> total + cartItem.quantity, 0
    );
      setCartCount(newCartCount)
  }, [cartItems]);

  useEffect(()=>{
    const newCartTotal = cartItems.reduce(
      (total,cartItem)=> total + cartItem.quantity * cartItem.price, 0
    );
    setCartTotal(newCartTotal)
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  } 

  const clearItemFromCart = (cartItemToDelete) => {
    setCartItems(clearCartItem(cartItems,cartItemToDelete));
  }

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