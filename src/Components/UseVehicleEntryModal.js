import React from 'react'
import { useState } from 'react';

function useVehicleEntryModal() {
  const [isModalVisible, setModalIsVisible] = useState(false);
  
  function toggleVehicleModal() {
    setModalIsVisible(!isModalVisible);
  }
return {
    isModalVisible,
    toggleVehicleModal,
  }
}

export default useVehicleEntryModal