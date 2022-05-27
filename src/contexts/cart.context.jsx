import { createContext, useState } from 'react';

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
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
});

export const CartProvider = ({children}) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const value = {isCartOpen,setIsCartOpen, cartItems, addItemToCart};
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};