import './App.css';
import Game from './components/Game';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Idling Game</h1>
      </header>
      <main>
        <Game />
      </main>
      <footer>
        <p>Created by me</p>
      </footer>
    </div>
  );
}

export default App;
