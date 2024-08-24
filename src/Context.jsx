import { createContext,  useReducer } from 'react';
import Listing from './data/Listing.json';
import Property from './data/Property.json'
import { reducer } from './reducer';

const AppContext = createContext();

const Context = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, {
    data: Listing.listing,
    cart: [],
    selectedProperty: Property,
    originalData:Listing.listing,
    filter:''
  });

  

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };
export default Context;
