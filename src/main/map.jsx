import React, { useState, useEffect } from "react";
import {io} from 'socket.io-client';
import { Map, TileLayer, Marker, Polyline, Popup} from 'react-leaflet';


let socket = io('wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl/',{
  path:"/flights"
});


function Mapa(){
  
  const [airplanes, setAirplanes] = useState([]);
  const [trace, setTrace] = useState({});
  const [plane, setPlane] = useState({});

  function setLine (avion, i) {
    const polyline = [avion.origin, avion.destination];
    const blackOption = {color : 'black'};
    return <Polyline key={i} pathOptions={blackOption} positions={polyline} />
  }
  
  function setMarker (avion) {
    return <Marker key={avion} position={plane[avion]}>
            <Popup>{avion}</Popup>
          </Marker> 
  }

  function setPath (avion, i) {
    const multiline = trace[avion];
    const redOption = {color : 'red'};
    return <Polyline key={i} pathOptions={redOption} positions={multiline} />
  }
  

  useEffect(() => {  
    socket.on('POSITION', data => {
      // poblar plane
      setPlane((prevState) => {
        const aux = {...prevState};
        aux[data.code] = data.position;
        return aux;
      });

      //poblar trace
      setTrace((prevState) => {
        const aux = {...prevState};
        aux[data.code] = prevState[data.code]
          ? [...prevState[data.code], data.position] : [data.position];
        return { ...aux };
      });
    });
    
    return () => socket.disconnect();
  }, []);
  
  
  useEffect(() => {
    socket.on('FLIGHTS', data => {
      setAirplanes((prevState) => [...prevState, ...data]);
    });
    
    socket.emit('FLIGHTS');

    return () => socket.disconnect();
  }, []);


  return (
  
  <div className="mapa">

    <h2>Mapa</h2>

    <Map center={[20, 0]} zoom={1.5} >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {airplanes.map((n, i) => setLine(n,i))}
      
      {Object.keys(plane).map((key) => setMarker(key))}

      {Object.keys(trace).map((key) => setPath(key))}


    </Map>


    </div>
  );
}

export default Mapa;