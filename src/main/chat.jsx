import React, { useState, useEffect } from "react";
import {io} from 'socket.io-client';

import './styles.css';

let socket = io('wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl/',{
  path:"/flights"
});

function Chat() {

  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState("");
  const [name, setName] = useState("");

  function sendResponse(){
    socket.emit('CHAT', {
      name: name, 
      message: response
    });
  }

  function showMessage (res, index) {
    var date = new Date(res.date).toLocaleString();
    console.log(date);
    return (<div key={index}> {date} {res.name}: {res.message}</div>);
  }

  useEffect(() => {
    socket.on('CHAT', data => {
      const auxmsg = messages;
      auxmsg.push(data);
      setMessages((prevState) => [...prevState, data]);
    });

    return () => socket.disconnect();
  }, []);


  return (
    <div className="chat"> 
      <div className="chat-window">

        <h3>Mensajes Recibidos</h3>

        {messages.map((item,index) => showMessage(item, index))}

      </div>

      <div className="chat-inputs">

        <input type="text" className="name" value={name} 
          placeholder="Elige un nombre" onChange={(i) => setName(i.target.value)}/>

        <input type="text" className="message" value={response} 
          placeholder="Escribe algo..." onChange={(i) => setResponse(i.target.value)}/>

        <button onClick={() => sendResponse()} >Enviar</button>

      </div>
    </div>
  );
}

export default Chat;