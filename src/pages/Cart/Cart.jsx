import { useContext, useState } from "react"
import { AppContext } from "../../context"
import SingleProp from "../../component/SingleProp/SingleProp"

const Cart = () => {
const{state:{cart}}=useContext(AppContext)
// const[total,setTotal]=useState();
console.log(cart.length);
  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length > 0 ? (
        cart.map((property, index) => (
          <SingleProp property={property} key={index} />
        ))
      ) : (
        <h3 style={{ padding: 10 }}>Your Cart is Empty!</h3>
      )}
    </div>
  );
}

export default Cart