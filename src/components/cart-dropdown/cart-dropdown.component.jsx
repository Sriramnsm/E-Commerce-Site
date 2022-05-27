import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context.jsx';

import Button from '../button/button.component.jsx'

import CartItem from '../cart-item/cart-item.component.jsx';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {

    const { cartItems } = useContext(CartContext);

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'/>
            {cartItems.map(item => <CartItem key={item.id} cartItem={item}/>)}
            <Button>CHECKOUT</Button>
        </div>
    );
};

export default CartDropdown;