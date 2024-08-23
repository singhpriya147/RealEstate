export const reducer=(state,action)=>{
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
       cart:state.cart.filter((c)=>c.id!=action.payload.id),
       
     };
   //  case 'FETCH_SINGLE_PROPERTY':
   // return {
   //   ...state,
   //   selectedProperty:
   //     state.data.find((item) => item.id === action.payload) || null, // Ensure fallback to null if not found
   // };
   default:
     return state;
 }
}