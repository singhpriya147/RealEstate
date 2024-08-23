
import './App.css'
import { Route, Routes} from 'react-router-dom';
// import PropertyListing from "./component/propertyListing/PropertyListing"
import Home from './pages/Home/Home'
import Header from './component/Header/Header'
import PropDetails from './pages/PropDetails/PropDetails';
import Cart from './pages/Cart/Cart';
function App() {
  

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/:id' element={<PropDetails />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
      </Routes>
    </>
  );
}

export default App
