import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom"
import { AppContext } from "../../Context.jsx";
import Listing from '../../data/Listing.json';
import './PropDetail.css'
import Badge from "../../component/Badge/Badge";
import Feature from '../../component/Feature/Feature'
import { properties } from "../../data/data";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed } from '@fortawesome/free-solid-svg-icons'; // 
import { faShower } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

const PropDetails = () => {
  const{id}=useParams();
 const{state,dispatch}=useContext(AppContext);
 const{data}=state;

 
  const selectedProperty=properties[id-1] ;

console.log("selected",selectedProperty)
console.log("id",id)

















  return (
    selectedProperty && <div className='propDetails'>
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
            <p>{selectedProperty.location}</p>
            <p>{selectedProperty.description}</p>{' '}
            {/* {isExpanded ? fullShortDescription : halfShortDescription} */}
            {/* <span
              onClick={toggleDescription}
              style={{ color: 'blue', cursor: 'pointer' }}
            >
              {isExpanded ? 'Read less' : 'Read More'}
            </span> */}
          </div>
        </div>
        <div className='ameneties-badge'>
          {selectedProperty.features.map((item, index) => (
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
            {selectedProperty.bedrooms}
          </Feature>
          <Feature>
            Bathroom
            <FontAwesomeIcon icon={faShower} />
            {selectedProperty.bathrooms}
          </Feature>
          <Feature>
            Floor
            <FontAwesomeIcon icon={faHouse} />
            {selectedProperty.area}
          </Feature>
          <Feature>
            Rent/Mo
            <FontAwesomeIcon icon={faCalendar} style={{ fontWeight: 200 }} />
            {selectedProperty.price}
          </Feature>
        </div>
        <h2>Contact Agent</h2>
        <div className='agent-detail'>
          {/* <img
            src={selectedProperty.agent_logo}
            style={{ widht: 50, height: 50 }}
            alt=''
          /> */}
          <h3>{selectedProperty.agent.name}</h3>
          <span>+44-{selectedProperty.agent.phone}</span>
          <div className='agent-adress'>
            <p>{selectedProperty.agent.email}</p>
            {/* <p>{selectedProperty.agent_postcode}</p>
            <p>{selectedProperty.post_town}</p> */}
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