import React, { useState } from "react";
import { createPortal } from "react-dom";
import { set, useForm } from "react-hook-form";
import "./Modal.css"


const VehicleModal = ({ isVisible, hideModal }) => {
  const vehicleType=[{id:1,name:"Car/Jeep/Van"},{id:2,name:"LCV"},{id:3,name:"Truck or Bus"},{id:4,name:"Heavy Vehicle"}]
  let dataset=(localStorage.toll_list)?JSON.parse(localStorage.toll_list):[]
  const cityName=[]
  for(let ind=0;ind<dataset.length;ind++)
  {
    cityName.push(dataset[ind].name)
  }
//console.log(cityName)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
    
  //console.log(register)
  const [value,setValue]=useState()
  let tariffvalue=null
  const onSubmit=(data)=>
  {
    if(!window.localStorage.vehicle_list){const vehicle_list=[]; localStorage.setItem('vehicle_list', JSON.stringify(vehicle_list))}
    for(let i=0;i<dataset.length;i++)
    {if(dataset[i].name===data.name){
            for(let j=0;j<4;j++)
            { //console.log(dataset[i].type[j])
                if((dataset[i].type[j].typename)===(data.type))
                {//console.log(dataset[i].type[j])
                    console.log(window.localStorage.vehicle_list[0])
                    if(window.localStorage.vehicle_list!="[]")
                    {let list = JSON.parse(localStorage.getItem("vehicle_list") || "[]");
                        let found=false;
                        for(let k=0;k<list.length;k++)
                        {if(list[k].id===data.id)
                            {
                                found=true;
                                const curr=new Date()
                                const currHour=curr.getHours()
                                const datetemp=new Date(list[k].timestamp)
                                const vhour=(curr-datetemp)*2.778*(0.0000001)
                                console.log(vhour)
                                if((vhour)<=1)
                                {tariffvalue=(dataset[i].type[j].return)}
                                else{tariffvalue=(dataset[i].type[j].single)
}
                            }
                        }
                        if(!found)
                        {
                            console.log(dataset[i].type[j].single)
                            tariffvalue=(dataset[i].type[j].single)
                        }
                    }
                    else
                    {
                        console.log(dataset)
                        tariffvalue=(dataset[i].type[j].single)
                    }

                }
            }
        }
    }
    let vehicle_list = JSON.parse(localStorage.getItem("vehicle_list") || "[]");
    console.log(tariffvalue)
    setValue(tariffvalue)
    const time=new Date()
    const vehicle_entry={name:data.name,type:data.type,id:data.id,timestamp:time,tariff:tariffvalue}
    vehicle_list.push(vehicle_entry)
    localStorage.setItem("vehicle_list",JSON.stringify(vehicle_list))
    document.getElementById("create").reset()
  }
  

  
  return isVisible
    ? createPortal(
        <div class="overlay">
          <div class="modal">
          <form id="create" onSubmit={handleSubmit(onSubmit)}>
            <label className="">
              <br/>
            <span className="">Select toll name*</span>
            <datalist id="cityName">
              {cityName.map((item)=>{
                  return(<option value={item} name={item}></option>)
              })}
          </datalist>
              <div>
                <input list="cityName" name="name" type="dropdown"  {...register('name',{required:true})}/>
              </div>
        </label>
        <label className="">
          <br/>
          <span>Select vehicle type</span>
          <datalist id="vehicle-list">
              {vehicleType.map((item)=>{
                  return(<option value={item.name} name={item.name}></option>)
              })}
          </datalist>
          <div>
                <input list="vehicle-list" name="type" type="dropdown" {...register('type',{required:true})}/>
              </div>
          </label>
          <label>
            <span>Vehicle Number</span>
            <br/>
            <input type="text" placeholder="Enter your login id" name="id" {...register('id',{required:true})}/>
            <label>
            <br/>
            <span>Tariff</span>
            <br/>
            <input readOnly="readonly" placeholder={value} />
          </label>
          </label>
          <br/>
          <button type="submit">create</button>
        </form>
        
          </div>
          <button onClick={hideModal}>
            Close
          </button>
        </div>,
        document.body,
      )
    : null;
};
export default VehicleModal;