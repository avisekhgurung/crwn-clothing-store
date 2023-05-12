import React, { Fragment, useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import { UserContext } from '../../contexts/UserContext';
import { signOutUser } from '../../utils/firebase.utils';
import {NavigationContainer, LogoContainer, NavLinksContainer, NavLink} from './navigation.styles.jsx';
import CartIcon from '../../components/CartIcon/CartIcon';
import CartDropdown from '../../components/CartDropdown/CartDropdown';
import { CartContext } from '../../contexts/CartContext';
import { setCurrentUser } from '../../store/user/user.action';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

const Navigation = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    // const {isCartOpen} = useContext(CartContext);
    const isCartOpen = useSelector(selectIsCartOpen);

    const signOutHandler = async() => {
    await signOutUser;
    dispatch(setCurrentUser(null))         
    }
    
    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrownLogo className="logo" />
                </LogoContainer>
                <NavLinksContainer>
                    <NavLink className='nav-link' to="/shop">
                        SHOP 
                    </NavLink>
                   {currentUser ? (
                    <NavLink as='span'
                    onClick={ signOutHandler }
                    className='nav-link'>
                        SIGN OUT
                    </NavLink>
                   ):(
                    <Link className='nav-link' to="/sign-in">
                    SIGNIN
                </Link>
                   )}
                   <CartIcon />
                </NavLinksContainer>
                {isCartOpen&& <CartDropdown /> }
            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;