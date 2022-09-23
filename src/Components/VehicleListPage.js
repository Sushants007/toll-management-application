import React, { useState } from 'react'
import Modal from './AddTollModal';
import useModal from './UseTollModal'
import './VehicleListPage.css'
import {Link} from 'react-router-dom'
import useVehicleEntryModal from './UseVehicleEntryModal';
import VehicleModal from './AddVehicleModal';
import VehicleList from './VehicleList';

//search conditions based on the form input--> if nothing there then display all.. if something there then display filtered
  //Search using vehicle
  //Filter using dropdown--city name....Button onClick gives a drop down.... display based on the item selected
  const SvgIcon=()=>{
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
<path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 1
2.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/></svg>
  }

function VehicleListPage() {
  const {isVisible, toggleModal} =useModal();
  const {isModalVisible, toggleVehicleModal}=useVehicleEntryModal();
  const visibleToll=isVisible && (!isModalVisible)
  const visibleVehicle=!isVisible && (isModalVisible)
  const [input,setInput]=useState("")
  const [filterinput,setfilterInput]=useState("")
  let tolldata=(localStorage.toll_list)?JSON.parse(localStorage.toll_list):[]
  const cityName=[]
  for(let ind=0;ind<tolldata.length;ind++)
  {
    cityName.push(tolldata[ind].name)
  }
  console.log(filterinput)
    let dataset=(localStorage.vehicle_list)?JSON.parse(localStorage.vehicle_list):[]
    const datafilter=((input)?dataset.filter((item,i)=>{
      console.log(dataset[i].id, input)
      return dataset[i].id.toLowerCase()==(input.toLowerCase()) 
  }):dataset)
  const data=(filterinput)?datafilter.filter((item,i)=>{
    return datafilter[i].name.toLowerCase()==(filterinput.toLowerCase())
  }):datafilter
        console.log(data)
  return (
    <div className='vehicle__list__page'>
        <div className='heading'><h1>Toll Management Application</h1></div>
        <div className='page__header'>
          <div className='left__side'>
          <div className='name left'>Toll Entries/Vehicle Entries</div>
                <div style={{height:'30px',
            width: '24px', marginRight:'0.01px'}} className="size">
        <SvgIcon />
      </div>
          <div className='filter left' >
          <datalist id="cityName">
              {cityName.map((item)=>{
                  return(<option value={item} name={item}></option>)
              })}
          </datalist>
          
          <input  list="cityName" name="name" type="dropdown" onInputCapture={(e)=>setfilterInput(e.target.value)} style={{
            height:'5px',width: '5px', marginLeft:'-10px', backgroundColor:'red', border:'none'}}/>
            </div>
          <div className='search left'><form><input type="text" placeholder='search vehicle' onChange={(e)=>setInput(e.target.value)}/><button className='search__button' type="submit" style={{marginLeft:'0px'}}>search</button></form></div>
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
            <div className='View__toll right'><button className='button' ><Link to='/toll'>View toll</Link></button></div>
          </div>
        </div>
        <VehicleList data={data}/>
    </div>
    
  )
}

export default VehicleListPage