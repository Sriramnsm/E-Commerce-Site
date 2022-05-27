import Button from '../button/button.component.jsx'

import './cart-dropdown.styles.scss';

const CartDropdown = () => {

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'/>
            <Button>CHECKOUT</Button>
        </div>
    );
};

export default CartDropdown;