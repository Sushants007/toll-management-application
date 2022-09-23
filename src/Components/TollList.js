import React from 'react'
import './TollList.css'

function TollList({data}) {
  return (
    <div>
    <div className='table'>
    <table>
        <thead>
            <tr>
                <th>Toll Name</th>
                <th>CAR/JEEP/VAN</th>
                <th>LCV</th>
                <th>TRUCK/BUS</th>
                <th>HEAVY VEHICLE</th>
            </tr>
        </thead>
        {data.map((toll,i)=>{
            return(
                <tbody>
                <tr>
                    <td>{data[i].name}</td>
                    {
                    data[i].type.map((element,j) => {
                        if(data[i].type[j].typename==='Car/Jeep/Van'){
                            return(<td>{data[i].type[j].single}/{data[i].type[j].return}</td>)
                        }
                    })
                    }
                    {
                        data[i].type.map((element,j) => {
                            if(data[i].type[j].typename==='LCV'){
                                return(<td>{data[i].type[j].single}/{data[i].type[j].return}</td>)
                            }
                        })
                    }
                    {
                        data[i].type.map((element,j) => {
                            if(data[i].type[j].typename==='Truck or Bus'){
                                return(<td>{data[i].type[j].single}/{data[i].type[j].return}</td>)
                            }
                        })
                    }
                    {
                        data[i].type.map((element,j) => {
                            if(data[i].type[j].typename==='Heavy Vehicle'){
                                return(<td>{data[i].type[j].single}/{data[i].type[j].return}</td>)
                            }
                        })
                    }
                </tr>
            </tbody>
            )
        })}
       
    </table>
</div></div>
  )
}

export default TollList