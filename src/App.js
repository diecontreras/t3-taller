import './App.css';

import Chat from './main/chat'
import Mapa from './main/map'
import Info from './main/info'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="map-container"> 
          <Mapa />
        </div>
        <div className="info-container">
          <Info />
        </div>
        <div className="chat-container">
          <Chat />
        </div>
      </header>
      <footer className="footer"></footer>
    </div>
  );
}

export default App;
