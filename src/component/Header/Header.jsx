import { PiShoppingCartSimpleLight } from 'react-icons/pi';
import './Header.css';
import { AppContext } from '../../context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
  const { state } = useContext(AppContext);
  const { cart } = state;
  return (
    <header className='header'>
      <Link to='/'>
        <div>
          <h2>SUCASA</h2>
        </div>
      </Link>

      <Link to='/cart'>
        <PiShoppingCartSimpleLight style={{ fontSize: 25 }} />
        <span className='cart-badge'>{cart.length}</span>
      </Link>
    </header>
  );
};

export default Header;
