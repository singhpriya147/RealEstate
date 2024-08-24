
import { useState } from 'react';
import './SingleProp.css'
import { AppContext } from '../../context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';


const SingleProp = ({property}) => {

  const removeHtmlTags = (str) => {
    return str.replace(/<[^>]*>/g, '');
  };
  const fullShortDescription = removeHtmlTags(property.short_description)
 



const getShorterDescription = (description, wordLimit) => {
  const words = description.split(' ');
  if (words.length <= wordLimit) {
    return description;
  }
  return words.slice(0, wordLimit).join(' ') + '...';
};


const halfShortDescription = getShorterDescription(fullShortDescription,15);

  const[isExpanded,setIsExpanded]=useState(false);
  const toggleDescription=()=>{
    setIsExpanded(!isExpanded);
  }


const { state ,dispatch } = useContext(AppContext);
const {cart } = state;

const AddToCart=()=>{
  dispatch({type:'ADD_TO_CART', payload:property})
}

const RemoveFromCart = () => {
  dispatch({ type: 'REMOVE_FROM_CART', payload: property });
};



const id = property.listing_id;
  return (
    <Link to={`/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className='single-property'>
        <div>
        
          <img
            src={property.images[0].original}
            height={250}
            width={250}
            className='image-div'
            alt=''
          />
          <h2>{property.title}</h2>
          <b>${property.price}</b>
          <p>
            {' '}
            {isExpanded ? fullShortDescription : halfShortDescription}
            <span
              onClick={toggleDescription}
              style={{ color: 'blue', cursor: 'pointer' }}
            >
              {isExpanded ? 'Read less' : 'Read More'}
            </span>
          </p>
          {cart.some((item) => item.listing_id === property.listing_id) ? (
            <button onClick={RemoveFromCart}>Remove Now</button>
          ) : (
            <button onClick={AddToCart}>Book Now</button>
          )}
        </div>
      </div>
    </Link>
  );
}

export default SingleProp