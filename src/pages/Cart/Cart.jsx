import { useContext, useState,useEffect } from "react"
import { AppContext } from "../../context"
import SingleProp from "../../component/SingleProp/SingleProp"
import './cart.css'
const Cart = () => {
const{state:{cart}}=useContext(AppContext)
const[total,setTotal]=useState(0);
console.log(cart.length);

useEffect(() => {
   setTotal(
     cart.reduce(
       (acc, curr) => acc + Number(curr.price),
       0 // Set initial value to 0
     )
   );
}, [cart]);

console.log("total",total);
  return (
    <div className='cart'>
      <div className='cart-main'>
        <h2>Your Cart is ready to GO !</h2>
        <div className="cart-item">
          {cart.length > 0 ? (
            cart.map((property, index) => (
              <SingleProp property={property} key={index} />
            ))
          ) : (
            <h3 style={{ padding: 10 }}>Your Cart is Empty!</h3>
          )}
        </div>
      </div>
      <div className='total-card'>
        <span className='title'> Added {cart.length} items to cart</span>

        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: ₹ {total}</span>
        <button disabled={cart.length === 0}>Proceed to Checkout</button>
      </div>
    </div>
  );
}

export default Cart