import GameEngine from './engine';
import './app.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => { GameEngine.getInstance(); });

  return (
    <div className="container">
      <div className="state-container">
        <div>
          <b>Текущее состояние:</b> {'Поиск листа'}
        </div>

        <div>
          <b>Текущее направлени:</b> {'Вверх'}
        </div>
      </div>

      <div>
        <canvas width={800} height={800} id='canvas'></canvas>
      </div>
    </div>
  );
}

export default App;
