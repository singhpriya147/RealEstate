import { createContext,  useReducer } from 'react';
import Listing from './data/Listing.json';
import Property from './data/Property.json'
import { reducer } from './reducer';

const AppContext = createContext();

const Context = ({ children }) => {
  // console.log('Property:', Property);
  const [state, dispatch] = useReducer(reducer, {
    data: Listing.listing,
    cart: [],
    selectedProperty: Property,
  });

  // useEffect(() => {
  //   // Initialize data in the state
  //   dispatch({ type: 'FETCH_DATA', payload: Listing.listing });
  // }, []);

  // console.log(state.data); 
  // console.log(state.selectedProperty); 

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };
export default Context;
