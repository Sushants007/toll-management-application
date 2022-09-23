import React from 'react'

function VehicleList({data}) {
  return (
    <div>
      <table>
        <thead>
            <tr>
                <th>Vehicle Type</th>
                <th>Vehicle Number</th>
                <th>Date/Time</th>
                <th>Toll Name</th>
                <th>Tariff</th>
            </tr>
        </thead>
        {data.map((vehicle,i)=>{
            return(
                <tbody>
                <tr>
                    <td>{data[i].type}</td>
                    <td>{data[i].id}</td>
                    <td>{data[i].timestamp}</td>
                    <td>{data[i].name}</td>
                    <td>{data[i].tariff}</td>
                </tr>
            </tbody>
            )
        })}
       
    </table>
    </div>
  )
}

export default VehicleList