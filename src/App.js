import './App.css';
import VehicleListPage from './Components/VehicleListPage';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import { Fragment } from 'react';
import ViewToll from './Components/ViewToll';

function App() {
  return (
    
    <div className="App">
      <Router>
        <Routes>
          <Route path='/toll' element={<Fragment><ViewToll/></Fragment>}/>
          <Route path='/' element={<Fragment><VehicleListPage/></Fragment>}/>
        </Routes>
      </Router>
        
      
    </div>
  );
}

export default App;
