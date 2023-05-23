import './Harita.css'
import { useState, useEffect} from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { getSpaceUntilMaxLength } from '@testing-library/user-event/dist/utils';
import Grid from '@mui/material/Grid';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import redIcon from './placeholder.png';


function Harita({lat, lng}){
    <><link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
        integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
        crossorigin="" /><script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
            integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
            crossorigin=""></script></>
     

     const [position, setPosition] = useState([lat, lng]);
     useEffect(() => {
        setPosition([lat, lng]);
      }, [lat, lng]);
     
    
     const circleProps = {
        center: [lat,lng],
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.1,
        radius: 1000,
      };

      const myIcon = L.icon({
        iconUrl: redIcon,
        iconSize: [19, 19],
        iconAnchor: [9.5, 9.5],
        popupAnchor: [0, -9],
    });

    const [zoom, setZoom] = useState(13);
    const [map, setMap] = useState(null);
    useEffect(() => {
        if (map) {
          map.setView([lat, lng], 13); // lat, lng koordinatlarına odakla, 13 zoom seviyesinde
        }
      }, [lat, lng, map]);

      useEffect(() => {
        setZoom(13);
      }, [lat, lng]);

    
    return(
       


        
            <div className="map">

            <MapContainer center={position} zoom={zoom} style={{ height:'100vh'}} whenCreated={setMap}  >
                <TileLayer
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    
                   
                />
                <Marker icon={myIcon} position={position} zoom={zoom}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <Circle {...circleProps} />
            </MapContainer>














      </div>
    )




}


export default Harita