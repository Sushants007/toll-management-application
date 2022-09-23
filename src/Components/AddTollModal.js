import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import './Modal.css'

const Modal = ({ isVisible, hideModal }) => {
 
  
  const vehicleType=[{id:1,name:"Car/Jeep/Van"},{id:2,name:"LCV"},{id:3,name:"Truck or Bus"},{id:4,name:"Heavy Vehicle"}]
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit=(data)=>
  {
    
    console.log(!window.localStorage.toll_list)
    if(!window.localStorage.toll_list){const toll_list=[]; localStorage.setItem('toll_list', JSON.stringify(toll_list))}   
    const toll={name:data.tollname,type:[{typename:data.option0,single:data.option0single,return:data.option0return},{typename:data.option1,single:data.option1single,return:data.option1return},{typename:data.option2,single:data.option2single,return:data.option2return},{typename:data.option3,single:data.option3single,return:data.option3return}]}
    console.log(toll);
    let toll_list = JSON.parse(localStorage.getItem("toll_list") || "[]");
    toll_list.push(toll)
    localStorage.setItem("toll_list",JSON.stringify(toll_list))
   // window.localStorage.setItem("toll_list",JSON.stringify(toll))
   //reset(data.tollname)
   document.getElementById("create").reset()
  }
  const handleCapture=(e)=>{
    e.preventDefault();
    console.log(e.target.value)
    const ele=document.getElementById("vehicle-list").childNodes[0]
    const opt=document.getElementsByName(e.target.value)
    //console.log(ele)
    ele.remove(opt)
    //opt.remove(e.target.value)
  }
  
  return isVisible
    ? createPortal(
        <div className="overlay">
          <div className="modal">
          <form id="create"
          onSubmit={handleSubmit(onSubmit)}>
            <label className="">
            <span className="">Toll Name*</span>
            <br/>
            <input placeholder="" name="tollname" type="text" {...register("tollname",{required:true})}/>
        </label>
        <label className="">
          <br/>
          <span>Vehicle fare details*</span>
          <datalist id="vehicle-list">
              {vehicleType.map((item)=>{
                  return(<option value={item.name} name={item.name}></option>)
              })}
          </datalist>
          {vehicleType.map((item,i)=>{
            return(
              <div>
                <input list="vehicle-list" name={"option"+i} type="dropdown" onInputCapture={handleCapture} {...register('option'+i,{required:true})}/>
                <input type="text" name={"option"+i+"single"} placeholder="single journey" {...register('option'+i+'single',{required:true})}/>
                <input type="text" name={"option"+i+"round"} placeholder="return journey" {...register('option'+i+'return',{required:true})}/>
              </div>
            )
          })}
          


        </label>
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
export default Modal;