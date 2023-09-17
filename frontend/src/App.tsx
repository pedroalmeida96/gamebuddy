import "./App.css";
import Home from "./HomePage.tsx";
import MyGames from "./MyGamesPage.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to GameBuddy</h1>
          <nav className="App-nav">
            <ul className="App-nav-list">
              <li className="App-nav-item">
                <a href="/">Home</a>
              </li>
              <li className="App-nav-item">
                <a href="/my-games">My Games</a>
              </li>
              <li className="App-nav-item">
                <a href="/settings">Settings</a>
              </li>
              <li className="App-nav-item">
                <a href="/about-us">About Us</a>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-games" element={<MyGames />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
