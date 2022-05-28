import { useContext } from 'react';


import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component.jsx';
import { CartContext } from '../../contexts/cart.context.jsx';

import {
  ProductCardContainer,
  Footer,
  Name,
  Price
} from './product-card.styles.jsx';


const ProductCard = ({product}) => {
  const {name,price,imageUrl} = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product)

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`}/>
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>  
      <Button 
        buttonType={ BUTTON_TYPE_CLASSES.inverted } 
        onClick={addProductToCart}
      >
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;