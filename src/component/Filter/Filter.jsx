import { useContext, useState } from 'react';
import './Filter.css';
// import { useState } from 'react';
import { Select } from '@chakra-ui/react';
import { AppContext } from '../../context';
import { properties } from '../../data/data';
const Filter = () => {
  //  const [selectedOption4, setSelectedOption4] = useState('');

  const { state, dispatch } = useContext(AppContext);
  const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
      const [type, setType] = useState('');
  const { data } = state;

  const handleBedroomFilter = (e) => {
    setBedrooms(`${e.target.value}`)
  
    const prevData = properties;

    const temp = prevData.filter((item) => {
      console.log(item?.bedrooms, item);
      return item?.bedrooms == e.target.value;
    });
    
    // console.log(e.target.value);
    // console.log(prevData, temp);

    
    dispatch({
      type: 'APPLY_FILTER',
      payload: temp 
    });
  };

  const handleBathroomFilter = (e) => {
    setBathrooms(`${e.target.value}`);

   const prevData = properties;

    const temp = prevData.filter((item) => {
      console.log(item?.bathrooms, item);
      return item?.bathrooms == e.target.value;
    });

    // console.log(e.target.value);
    // console.log(prevData, temp);

    dispatch({
      type: 'APPLY_FILTER',
      payload: temp,
    });
  };
  const handleTypeFilter = (e) => {
    setType(e.target.value);

    const prevData = properties;

    const temp = prevData.filter((item) => {
      console.log(item?.type, item);
      return item?.type == e.target.value;
    });

    console.log(e.target.value);
    console.log(prevData, temp);

    dispatch({
      type: 'APPLY_FILTER',
      payload: temp,
    });
  };
  return (
    <div className='filter-container'>
      <h3>Filter</h3>
      <Select
        value={bedrooms}
        onChange={handleBedroomFilter}
        placeholder='No. of Bedroom'
      >
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
      <Select
        value={bathrooms}
        onChange={handleBathroomFilter}
        placeholder='No. of Bathroom'
      >
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
      <Select
        value={type}
        onChange={handleTypeFilter}
        placeholder='Property type'
      >
        <option value='House'>House</option>
        <option value='Apartment'>Apartment</option>
        <option value='Condo'>Condo</option>
        <option value='Cottage'>Cottage</option>
        {/* <option value='4'>4</option>
        <option value='5'>5</option>
        <option value='6'>6</option>
        <option value='7'>7</option>
        <option value='8'>8</option>
        <option value='9'>9</option> */}
      </Select>
    </div>
  );
};

export default Filter;
