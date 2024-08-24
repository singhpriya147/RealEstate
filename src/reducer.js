export const reducer=(state,action)=>{
  
    
 switch (action.type) {
   case 'SET_CURRENT_USER':
     return {
       ...state,
       currentUser: action.payload,
     };
   case 'SET_USER_LOGGED_IN':
     return {
       ...state,
       userLoggedIn: action.payload,
     };
   case 'SET_EMAIL_USER':
     return {
       ...state,
       isEmailUser: action.payload,
     };
   case 'SET_GOOGLE_USER':
     return {
       ...state,
       isGoogleUser: action.payload,
     };
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
   case 'SET_USER_BOOKMARKS':
     return { ...state, userBookmarks: action.payload };
    // case 'APPLY_FILTER':
    // return {
    //   {}
    // }
   default:
     return state;
 }
}