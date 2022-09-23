import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import VehicleModal from './AddVehicleModal';
import Modal from './AddTollModal'
import useModal from './UseTollModal';
import TollList from './TollList';
import useVehicleEntryModal from './UseVehicleEntryModal';

function ViewToll() {
    const {isVisible, toggleModal} =useModal();
    const {isModalVisible, toggleVehicleModal}=useVehicleEntryModal();
    const visibleToll=isVisible && (!isModalVisible)
    const visibleVehicle=!isVisible && (isModalVisible)
    const [input,setInput]=useState("")
    let dataset=(localStorage.toll_list)?JSON.parse(localStorage.toll_list):[]
    const data=(input)?dataset.filter((item,i)=>{
            console.log(dataset[i].name, input)
            return dataset[i].name.toLowerCase()==(input.toLowerCase())
        }):dataset
        console.log(data)
      
    
  return (
    <div className='view__toll__page'>
        <div className='heading'><h1>Toll Management Application</h1></div>
        <div className='page__header'>
          <div className='left__side'>
          <div className='name left'>Toll gate list</div>
          <div className='search left'><form><input type="text" placeholder='search Toll' onChange={(e)=>setInput(e.target.value)}/><button style={{display:'none'}} type="submit"></button></form></div>
          <div></div>
          </div>
          <div className='right__side'>
          <div className='Add__vehicle right'>
            <button className='button' onClick={toggleVehicleModal}>Add Vehicle Entry</button>
            <VehicleModal isVisible={visibleVehicle} hideModal={toggleVehicleModal} />
              </div>
            <div className='Add__toll right'>
              <button className='button'onClick={toggleModal}>Add new toll</button>
              <Modal isVisible={visibleToll} hideModal={toggleModal} />
            </div> 
            <div className='View__toll right'><button><Link to='/'>Go back to vehicle list page</Link></button></div>
          </div>
        </div>
        <TollList data={data}/>

    </div>
  )
}


export default ViewToll