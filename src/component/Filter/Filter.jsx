import { useContext, useState } from 'react';
import './Filter.css'
// import { useState } from 'react';
import { Select } from '@chakra-ui/react';
import { AppContext } from '../../context';
const Filter = () => {
//  const [selectedOption4, setSelectedOption4] = useState('');

const{state,dispatch}=useContext(AppContext);
const [bedrooms, setBedrooms] = useState('');
const handleFilterChange = (e) => {
  const selectedBedrooms = parseInt(e.target.value, 10); // Convert to integer
  setBedrooms(selectedBedrooms);
  //  dispatch({
  //    type: 'SET_FILTER',
  //    payload: bedrooms, // Convert to integer
  //  });
  dispatch({
    type: 'APPLY_FILTER',
    payload: selectedBedrooms // Convert to integer
  });
};
  return (
    <div className='filter-container'>
      <h3>Filter</h3>
      <Select  value={bedrooms} onChange={handleFilterChange}placeholder='No. of Bedroom'>
        <option value='0'>0</option>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
        <option value='6'>6</option>
        <option value='7'>7</option>
        <option value='8'>8</option>
        <option value='9'>9</option>
        
      </Select>
    </div>
  );
}

export default Filter