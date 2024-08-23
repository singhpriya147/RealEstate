import { useContext, useEffect,useState } from "react";
import { useParams } from "react-router-dom"
import { AppContext } from "../../context";
import Listing from '../../data/Listing.json';
import './PropDetail.css'
import Badge from "../../component/Badge/Badge";
import Feature from '../../component/Feature/Feature'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon
import { faShower } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
// import {}
// import { fa-house } from '@fortawesome/free-solid-svg-icons';
// import { faCalender } from '@fortawesome/free-solid-svg-icons';
const PropDetails = () => {
  const{id}=useParams();
 const{state,dispatch}=useContext(AppContext);
 const{data}=state;
//  console.log("data",data)
 
  const { selectedProperty} = state;
console.log("selected",selectedProperty)
// console.log(id)



const removeHtmlTags = (str) => {
  return str.replace(/<[^>]*>/g, '');
};
const fullShortDescription = removeHtmlTags(selectedProperty.description);

const getShorterDescription = (description, wordLimit) => {
  const words = description.split(' ');
  if (words.length <= wordLimit) {
    return description;
  }
  return words.slice(0, wordLimit).join(' ') + '...';
};

const halfShortDescription = getShorterDescription(fullShortDescription, 50);

const [isExpanded, setIsExpanded] = useState(false);
const toggleDescription = () => {
  setIsExpanded(!isExpanded);
};









 useEffect(()=>{
  if (id) {
    // Fetch data if not already available
    if (data.length === 0) {
      dispatch({ type: 'FETCH_DATA', payload: Listing.listing });
    }
    dispatch({ type: 'FETCH_SINGLE_PROPERTY', payload: parseInt(id) });
  }
  // dispatch({type:'FETCH_SINGLE_PROPERTY',payload:id})
 },[dispatch,id,data])

// if (!selectedProperty) {
//   return <div>Loading...</div>; // Loading state or handle case when no property is found
// }



  return (
    <div className='propDetails'>
      <section className='left-side'>
        <div className='image-wrapper'>
          <div className='image-contianer-left'>
            <img
              src={selectedProperty.images[0].original}
              height={300}
              width={400}
              alt=''
            />
          </div>
          <div className='image-contianer-right'>
            <img src={selectedProperty.images[1].original} alt='' />
            <img src={selectedProperty.images[2].original} alt='' />
            <img src={selectedProperty.images[3].original} alt='' />
            <img src={selectedProperty.images[4].original} alt='' />
          </div>
        </div>

        <div className='detail-container'>
          <div className='detail-container-header'>
            <h2>{selectedProperty.title}</h2>
            <p>{selectedProperty.displayable_address}</p>
            {/* <p>{selectedProperty.description}</p> */}{' '}
            {isExpanded ? fullShortDescription : halfShortDescription}
            <span
              onClick={toggleDescription}
              style={{ color: 'blue', cursor: 'pointer' }}
            >
              {isExpanded ? 'Read less' : 'Read More'}
            </span>
          </div>
        </div>
        <div className='ameneties-badge'>
          {selectedProperty.bullet.map((item, index) => (
            <Badge key={index}>{item}</Badge>
          ))}
        </div>
      </section>
      <section className='right-side'>
        <h2>Addition Information</h2>
        <div className='feature'>
          <Feature>
            Bedroom
            <FontAwesomeIcon icon={faBed} />
            {selectedProperty.num_bedrooms}
          </Feature>
          <Feature>
            Bathroom
            <FontAwesomeIcon icon={faShower} />
            {selectedProperty.num_bathrooms}
          </Feature>
          <Feature>
            Floor
            <FontAwesomeIcon icon={faHouse} />
            {selectedProperty.num_floors}
          </Feature>
          <Feature>
            Rent/Mo
            <FontAwesomeIcon icon={faCalendar} style={{ fontWeight: 200 }} />
            ${selectedProperty.rental_prices.per_month}
          </Feature>
        </div>
        <h2>Contact Agent</h2>
        <div className='agent-detail'>
          <img
            src={selectedProperty.agent_logo}
            style={{ widht: 50, height: 50 }}
            alt=''
          />
          <h3>{selectedProperty.agent_name}</h3>
          <span>+44-{selectedProperty.agent_phone}</span>
          <div className='agent-adress'>
            <p>{selectedProperty.agent_address}</p>
            <p>{selectedProperty.agent_postcode}</p>
            <p>{selectedProperty.post_town}</p>
          </div>
        </div>
        <div>
          <button>Book Now</button>
        </div>
      </section>
    </div>
  );
}

export default PropDetails