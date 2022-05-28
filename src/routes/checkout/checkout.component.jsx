import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context.jsx';

import CheckOutItem from '../../components/checkout-item/checkout-item.component.jsx';

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total
} from './checkout.styles.jsx'


const CheckOut = () => {
  
  const { cartItems, cartTotal } = useContext(CartContext);
  
  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock className="header-block"><span>Product</span></HeaderBlock>
        <HeaderBlock className="header-block"><span>Description</span></HeaderBlock>
        <HeaderBlock className="header-block"><span>Quantity</span></HeaderBlock>
        <HeaderBlock className="header-block"><span>Price</span></HeaderBlock>
        <HeaderBlock className="header-block"><span>Remove</span></HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => {
        return (<CheckOutItem key={cartItem.id} cartItem={cartItem}/>);
      })}
      <Total>Total: ${cartTotal}</Total>
    </CheckoutContainer>
  );
};
    
export default CheckOut;