
import { useContext } from 'react';
import { AppContext } from '../../Context.jsx';

const CartButton = ({ property }) => {
  const { state, dispatch } = useContext(AppContext);
  const { cart } = state;

  const AddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: property });
  };

  const RemoveFromCart = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: property });
  };

  return cart.some((item) => item.id === property.id) ? (
    <button onClick={RemoveFromCart}>Remove Now</button>
  ) : (
    <button onClick={AddToCart}>Book Now</button>
  );
};

export default CartButton;
