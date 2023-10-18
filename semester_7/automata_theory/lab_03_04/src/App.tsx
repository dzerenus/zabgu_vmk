import Engine from './engine';
import './app.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => { Engine.getInstance(); });

  return (
    <div className="container">
      <div className="state-container">
        <div>
          <b>Текущее состояние:</b> <span id='status-text'>Поиск листа</span>
        </div>
      </div>

      <div>
        <canvas width={800} height={800} id='canvas'></canvas>
      </div>
    </div>
  );
}

export default App;
