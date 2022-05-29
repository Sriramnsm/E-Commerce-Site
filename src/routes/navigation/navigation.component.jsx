import { Fragment, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CartIcon from '../../components/cart-icon/cart-icon.component.jsx';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component.jsx';

import { CartContext } from '../../contexts/cart.context.jsx';
import { selectCurrentUser } from '../../store/user/user.selector.js';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import { NavigationContainer, NavLinks, NavLink, LogoContainer } from './navigation.styles.jsx';


const Navigation = () => {

  const currentUser = useSelector(selectCurrentUser);
  const { isCartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>
            SHOP
          </NavLink>
          {
            currentUser ? 
            (
              <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
            ) : 
            (
              <NavLink to='/auth'>SIGN IN</NavLink>
            )
          }
          <CartIcon />
        </NavLinks>
        { isCartOpen && <CartDropdown /> }
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
