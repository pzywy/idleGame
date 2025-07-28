import './App.css';
import Game from './components/Game';
import Navigation from './components/Navigation';
import Stats from './components/Stats';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Idling Game</h1>
        {/* <Stats /> */}
        <Navigation />
      </header>
      <div className='layout'>
        <div className='side-nav'>
          <Stats />
        </div>
        <main>
          <Game />
        </main>
      </div>
      {/* <footer>
        <p>Created by me</p>
      </footer> */}
    </div>
  );
}

export default App;
