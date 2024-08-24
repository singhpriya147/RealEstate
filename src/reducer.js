export const reducer=(state,action)=>{
  //  console.log('Action Payload:', action.payload);
    
 switch (action.type) {
  
   case 'FETCH_DATA':
     return {
       ...state,
       data: action.payload,
     };
   case 'ADD_TO_CART':
     return {
       ...state,
       cart: [...state.cart, { ...action.payload, qty: 1 }],
     };
   case 'REMOVE_FROM_CART':
     return {
       ...state,
       cart: state.cart.filter(
         (c) => c.listing_id != action.payload.listing_id
       ),
     };

   
   default:
     return state;
 }
}