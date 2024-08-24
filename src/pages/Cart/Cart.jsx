import { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context';
import SingleProp from '../../component/SingleProp/SingleProp';
import './cart.css';
import { AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = useContext(AppContext);
  const [total, setTotal] = useState();
  console.log(cart.length);

  const navigate = useNavigate();

  // useEffect(() => {
  //    setTotal(
  //      cart.reduce(
  //        (acc, curr) => acc + (Number(curr.price))*curr.qty,
  //        0 // Set initial value to 0
  //      )
  //    );
  // }, [cart]);

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => {
        // Remove the dollar sign and commas from the price string
        const priceNumber = Number(curr.price.replace(/[^0-9.-]+/g, ''));
        return acc + priceNumber * (curr.qty || 1);
      }, 0)
    );
  }, [cart]);

  const checkout = () => {
    navigate('/checkout');
  };

  console.log(total);

  const handleDecrease = (prod) => {
    // dispatch({
    //   type: 'CHANGE_CART_QTY',
    //   payload: {
    //     id: prod.id,
    //     qty: Math.max(prod.qty - 1, 1),
    //   },
    // });


      if (prod.qty > 1) {
        dispatch({
          type: 'CHANGE_CART_QTY',
          payload: {
            id: prod.id,
            qty: prod.qty - 1,
          },
        });
      } else {
        dispatch({
          type: 'REMOVE_FROM_CART',
          payload: prod,
        });
      }

  };

  const handleIncrease = (prod) => {


    // console.log(prod, "line53");
   
      dispatch({
        type: 'CHANGE_CART_QTY',
        payload: {
          id: prod.id,
          qty: prod.qty + 1,
        },
      });
    
  };

  // console.log("total",total);
  return (
    <div className='cart'>
      <div className='cart-main'>
        <h2>Your Cart is ready to GO !</h2>
        <div className='cart-item'>
          {cart.length > 0 ? (
            cart.map((property, index) => (
                
              <div key={property.id}  className='cart-item-container'>
                <SingleProp property={property} key={index} />
                <div className='control'>
                  <div className='quantity-control'>
                    
                    <button  onClick={() => handleDecrease(property)}>-</button>
                    <span className='qyt'>{property.qty}</span>
                    <button onClick={() => handleIncrease(property)}>+</button>
                  </div>
                  <AiFillDelete
                    fontSize='20px'
                    style={{ cursor: 'pointer' }}
                    onClick={() =>
                      dispatch({
                        type: 'REMOVE_FROM_CART',
                        payload: property,
                      })
                    }
                  />
                </div>

              </div>
            ))
          ) : (
            <h3 style={{ padding: 10 }}>Your Cart is Empty!</h3>
          )}
        </div>
      </div>
      <div className='total-card'>
        <span className='title'> Added {cart.length} items to cart</span>

        <span style={{ fontWeight: 700, fontSize: 20 }}>Total:${total}</span>
        <button disabled={cart.length === 0} onClick={checkout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
