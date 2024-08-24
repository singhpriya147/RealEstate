
import { Navigate } from 'react-router-dom';
import { AppContext } from './context';
import { useContext } from 'react';

const ProtectedRoute = ({ element }) => {
  const{state}=useContext(AppContext);
 const{userLoggedIn}=state;

  return true? element : <Navigate to='/login' />;
};

export default ProtectedRoute;
