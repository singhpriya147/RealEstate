export const reducer = (state, action) => {
  const existingItem = state.cart.find((c) => c.id === action.payload.id);

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
    //  case 'FETCH_DATA':
    //    return {
    //      ...state,
    //      data: action.payload,
    //    };
    //  case 'ADD_TO_CART':
    //    return {
    //      ...state,
    //      cart: [...state.cart, { ...action.payload, qty: 1 }],
    //    };

    case 'ADD_TO_CART':
      // Check if the item is already in the cart

      if (existingItem) {
        // If the item is already in the cart, increase the quantity
        return {
          ...state,
          cart: state.cart.map((c) =>
            c.id === action.payload.id ? { ...c, qty: c.qty + 1 } : c
          ),
        };
      } else {
        // If the item is not in the cart, add it with qty initialized to 1
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, qty: 1 }],
        };
      }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((c) => c.id != action.payload.id),
      };

    case 'CHANGE_CART_QTY':
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
        ),
      };

    case 'SET_SELECTED_PROPERTY':
      console.log(action.payload, 'line71');
      return {
        ...state,
        selectedProperty: action.payload,
      };
    case 'SET_USER_BOOKMARKS':
      return { ...state, userBookmarks: action.payload };
    case 'APPLY_FILTER':
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
