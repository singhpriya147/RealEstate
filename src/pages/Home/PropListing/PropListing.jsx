// import Listing from '../../../data/Listing.json'
// import { useState,useEffect } from 'react'
import { useContext } from 'react';
import SingleProp from '../../../component/SingleProp/SingleProp';
import './PropListing.css'
import {AppContext} from '../../../context';
import { useNavigate } from 'react-router-dom';

const PropListing = () => {
 
const { state,dispatch } = useContext(AppContext);
 const { data } = state;
   const navigate = useNavigate();
 console.log("data in property-listing",state);
 
  if (!data || data.length === 0) {
    // Optionally, show a loading spinner or message here
    return <div>Loading properties...</div>;
  }


const handlePropertyClick = (property) => {

  // dispatch({
  //   type: 'SET_SELECTED_PROPERTY',
  //   payload: property,
  // });
   navigate(`/${property.id}`);
};


  return (
    <div className='property-listing'>
      {data.map((property) => (
        <>
          <SingleProp
            property={property}
           
            key={property.id}
            onClick={() => handlePropertyClick(property)}
          />
        </>
      ))}
    </div>
  );
}

export default PropListing