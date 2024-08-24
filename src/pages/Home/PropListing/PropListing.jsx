// import Listing from '../../../data/Listing.json'
// import { useState,useEffect } from 'react'
import { useContext } from 'react';
import SingleProp from '../../../component/SingleProp/SingleProp';
import './PropListing.css'
import {AppContext} from '../../../context';


const PropListing = () => {
 
const { state } = useContext(AppContext);
 const { data } = state;
 
 console.log("data in property-listing",state);
 
  if (!data || data.length === 0) {
    // Optionally, show a loading spinner or message here
    return <div>Loading properties...</div>;
  }
  return (
    <div className='property-listing'>
      {data.map((property, index) => (
        <>
          
          <SingleProp property={property} key={index} />
        </>
      ))}
    </div>
  );
}

export default PropListing