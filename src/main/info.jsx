import React, { useState, useEffect } from "react";
import {io} from 'socket.io-client';

import './styles.css';

let socket = io('wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl/',{
  path:"/flights"
});

function Info() {

  const [airplanes, setAirplanes] = useState([]);

  function requestInfo() {
    socket.emit('FLIGHTS');
  }

  function showPassengers(p, i){
    return <div className="pipul"> {i+1}.- {p.name}</div>
  }

  function showInfo(plane, index) {
    return( 
      <div className="airplane-container">
        <p>Aerolínea: {plane.airline}</p>
        <p>Vuelo: {plane.code}</p>
        <p>Origen: {plane.origin[0]}, {plane.origin[1]}</p>
        <p>Destino: {plane.destination[0]}, {plane.destination[1]}</p>
        <p>Avión: {plane.plane}</p>
        <p>Cantidad de asientos: {plane.seats}</p>
        {plane.passengers.map((item, index) => showPassengers(item, index))}
      </div> 
    );
  }

  useEffect(() => {
    socket.on('FLIGHTS', data =>{
      setAirplanes(data);
    });

    return () => socket.disconnect();
  }, []);

  return(
    <div className="info">
      <h2>Info Aviones</h2>
      <button className="boton" onClick={() => requestInfo()}> Obtener Info</button>
      {airplanes.map((item, index) => showInfo(item, index))}
    </div>
  );
}

export default Info;