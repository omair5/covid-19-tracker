import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import InfoCards from './components/infoCards';
import { Myprovider } from './components/globalstate';
import Chart from './components/chart'
import CountryPicker from './components/countryPicker';
import PopUp from './components/popup'



function App() {
  return (
    <Myprovider>
      <div >
        <PopUp />
        <Navbar />
        <InfoCards />
        <CountryPicker />
        <Chart />
      </div>
    </Myprovider>


  );
}

export default App;
