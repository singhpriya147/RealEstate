// import Listing from '../../../data/Listing.json'
// import { useState,useEffect } from 'react'
import { useContext } from 'react';
import SingleProp from '../../../component/SingleProp/SingleProp';
import './PropListing.css'
import {AppContext} from '../../../context';


const PropListing = () => {
 
const { state } = useContext(AppContext);
 const { data } = state;
 
 console.log(state);
  return (
    <div className="property-listing">
      

        {data.map((property, index) => (
          <SingleProp  property={property} key={index}/>

        
        ))}
      
    </div>
  );
}

export default PropListing