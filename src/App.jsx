
import './App.css'
import { Route, Routes} from 'react-router-dom';

import Home from './pages/Home/Home'
import Header from './component/Header/Header'
import PropDetails from './pages/PropDetails/PropDetails';
import Cart from './pages/Cart/Cart';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import { AppContext } from './context';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import BookmarkedItemsList from './pages/Bookmarked/Bookmarked';
import ProtectedRoute from './ProtectedRoute';
import Checkout from './component/Checkout/Checkout';
function App() {
  
const { state } = useContext(AppContext);

const { userLoggedIn } = state;



console.log('userLoggedIn in app', userLoggedIn);
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Registration />} />
        <Route path='/login' element={<Login />} />

        <Route path='/home' element={<ProtectedRoute element={<Home />} />} />
        <Route
          path='/:id'
          element={<ProtectedRoute element={<PropDetails/>} />}
        />
        {/* <Route path='/cart' element={<ProtectedRoute element={<Cart />} />} /> */}
        <Route path='/cart'  element={<Cart />}  />
        <Route
          path='/bookmarks'
          element={<ProtectedRoute element={<BookmarkedItemsList />} />}
        />

        <Route
          path='/checkout'
          element={<ProtectedRoute element={<Checkout />} />}
        />
        {/* Redirect to login if the user is not authenticated */}
        <Route
          path='*'
          element={
            userLoggedIn ? <Navigate to='/home' /> : <Navigate to='/login' />
          }
        />
      </Routes>
    </>
  );
}

export default App
