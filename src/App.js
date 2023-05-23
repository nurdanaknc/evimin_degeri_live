import './App.css';
import { useState,useEffect } from 'react';
import Glass from './components/Glass';
import Harita from './components/Harita';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';

function App() {

  const [lat, setLat] = useState(40.9929379);
  const [lng, setLng] = useState(29.1135187);

  const handleLatChange = (value) => {
    setLat(value);
  };

  const handleLngChange = (value) => {
    setLng(value);
  };

  useEffect(() => {
    // lat veya lng değiştiğinde yapmak istediğiniz işlemleri burada gerçekleştirin
    console.log(`lat: ${lat}, lng: ${lng}`);
  }, [lat, lng]); // lat veya lng değiştiğinde useEffect'in tetiklenmesini sağlar



  return (
    <div className="app" >
      <Navbar/>
      <Grid style={{alignItems: "stretch"}} direction="row">
      <Grid className="title"> 
         
         <h2>Evimin Değeri</h2> Düşüncendeki evin fiyatını tahmin eden bir makine öğrenmesi modeli   
      </Grid>
        <Grid item xs={12} md={12} style={{}}>
          <Box  sx={{width: "100%"}}><Glass onLatChange={handleLatChange} onLngChange={handleLngChange} /></Box>
        </Grid>
      
        
      </Grid>

      <Footer/>
    </div>
  );
}

export default App;
